import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// JD APIs
export const uploadJDText = (data) => api.post('/jd/text', data)
export const uploadJDFile = (formData) => api.post('/jd/upload', formData)
export const getAllJDs = () => api.get('/jd')
export const deleteJD = (id) => api.delete(`/jd/${id}`)

/**
 * SSE-based screening.
 * Calls onEvent(eventName, data) for each SSE event.
 * Returns a Promise that resolves when the stream closes.
 */
export const screenResumesSSE = (formData, onEvent) => {
  return new Promise((resolve, reject) => {
    const base = import.meta.env.VITE_API_BASE_URL || ''
    const url  = `${base}/screening/screen`

    // fetchEventSource pattern using native fetch + ReadableStream
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const err = await response.json().catch(() => ({}))
          reject(new Error(err.message || `HTTP ${response.status}`))
          return
        }

        const reader  = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer    = ''

        const processChunk = (chunk) => {
          buffer += chunk
          const parts = buffer.split('\n\n')
          buffer = parts.pop() // keep incomplete last chunk

          for (const part of parts) {
            if (!part.trim() || part.startsWith(': ping')) continue

            let eventName = 'message'
            let dataLine  = ''

            for (const line of part.split('\n')) {
              if (line.startsWith('event:')) eventName = line.slice(6).trim()
              if (line.startsWith('data:'))  dataLine  = line.slice(5).trim()
            }

            if (!dataLine) continue
            try {
              const parsed = JSON.parse(dataLine)
              onEvent(eventName, parsed)
              if (eventName === 'done' || eventName === 'error') resolve(parsed)
            } catch {
              // malformed chunk — skip
            }
          }
        }

        const pump = async () => {
          while (true) {
            const { done, value } = await reader.read()
            if (done) { resolve(null); break }
            processChunk(decoder.decode(value, { stream: true }))
          }
        }

        pump().catch(reject)
      })
      .catch(reject)
  })
}

// Session APIs
export const getAllSessions = () => api.get('/sessions')
export const getSession = (id) => api.get(`/sessions/${id}`)
export const deleteSession = (id) => api.delete(`/sessions/${id}`)
