import { useState } from 'react'
import toast from 'react-hot-toast'
import { screenResumesSSE } from '../services/api'

/**
 * useScreening — SSE-powered hook
 *
 * Exposes:
 *   loading        boolean
 *   progress       { processed, total, items: [{fileName, candidateName, recommendation, finalScore}] }
 *   runScreening({ jdId, weightages, resumes }) → Promise<{ sessionId, results }>
 */
export default function useScreening() {
  const [loading, setLoading]   = useState(false)
  const [progress, setProgress] = useState({ processed: 0, total: 0, items: [] })

  const runScreening = async ({ jdId, weightages, resumes }) => {
    setLoading(true)
    setProgress({ processed: 0, total: resumes.length, items: [] })

    const formData = new FormData()
    formData.append('jdId', jdId)
    formData.append('weightages', JSON.stringify(weightages))
    resumes.forEach((file) => formData.append('resumes', file))

    return new Promise((resolve, reject) => {
      screenResumesSSE(formData, (event, data) => {
        switch (event) {
          case 'start':
            setProgress({ processed: 0, total: data.total, items: [] })
            break

          case 'progress':
            setProgress((prev) => ({
              processed: data.processed,
              total:     data.total,
              items: [
                ...prev.items,
                {
                  fileName:       data.fileName,
                  candidateName:  data.candidateName,
                  recommendation: data.recommendation,
                  finalScore:     data.finalScore,
                },
              ],
            }))
            break

          case 'done':
            toast.success(`Screened ${data.results.length} candidate${data.results.length !== 1 ? 's' : ''} successfully`)
            if (data.failedCount > 0) {
              toast.error(`${data.failedCount} resume${data.failedCount > 1 ? 's' : ''} could not be processed`)
            }
            setLoading(false)
            resolve(data)
            break

          case 'error':
            toast.error(data.message || 'Screening failed, please try again')
            setLoading(false)
            reject(new Error(data.message))
            break

          default:
            break
        }
      }).catch((err) => {
        toast.error(err.message || 'Screening failed, please try again')
        setLoading(false)
        reject(err)
      })
    })
  }

  return { loading, progress, runScreening }
}
