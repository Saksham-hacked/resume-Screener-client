import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// JD APIs
export const uploadJDText = (data) => api.post('/jd/text', data)
export const uploadJDFile = (formData) => api.post('/jd/upload', formData)
export const getAllJDs = () => api.get('/jd')
export const deleteJD = (id) => api.delete(`/jd/${id}`)

// Screening APIs
export const screenResumes = (formData, onUploadProgress) =>
  api.post('/screening/screen', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })

// Session APIs
export const getAllSessions = () => api.get('/sessions')
export const getSession = (id) => api.get(`/sessions/${id}`)
export const deleteSession = (id) => api.delete(`/sessions/${id}`)
