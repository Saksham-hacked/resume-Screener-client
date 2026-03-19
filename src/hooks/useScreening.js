import { useState } from 'react'
import toast from 'react-hot-toast'
import { screenResumes } from '../services/api'

export default function useScreening() {
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const runScreening = async ({ jdId, weightages, resumes }) => {
    setLoading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append('jdId', jdId)
    formData.append('weightages', JSON.stringify(weightages))
    resumes.forEach((file) => formData.append('resumes', file))

    try {
      const res = await screenResumes(formData, (e) => {
        if (e.total) setUploadProgress(Math.round((e.loaded * 100) / e.total))
      })
      toast.success(`Screened ${res.data.results.length} candidates successfully`)
      return res.data
    } catch (err) {
      toast.error(err.response?.data?.message || 'Screening failed, please try again')
      throw err
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return { loading, uploadProgress, runScreening }
}
