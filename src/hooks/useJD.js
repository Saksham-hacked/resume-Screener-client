import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getAllJDs, uploadJDText, uploadJDFile, deleteJD } from '../services/api'

export default function useJD() {
  const [jds, setJDs] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchJDs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllJDs()
      setJDs(res.data.jds)
    } catch {
      toast.error('Failed to load job descriptions')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveJDText = async (title, content) => {
    try {
      const res = await uploadJDText({ title, content })
      toast.success('Job description saved')
      return res.data.jd
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save JD')
      throw err
    }
  }

  const saveJDFile = async (file, title) => {
    const formData = new FormData()
    formData.append('file', file)
    if (title) formData.append('title', title)
    try {
      const res = await uploadJDFile(formData)
      toast.success('JD uploaded successfully')
      return res.data.jd
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload JD')
      throw err
    }
  }

  const removeJD = async (id) => {
    try {
      await deleteJD(id)
      setJDs((prev) => prev.filter((j) => j._id !== id))
      toast.success('JD deleted')
    } catch {
      toast.error('Failed to delete JD')
    }
  }

  return { jds, loading, fetchJDs, saveJDText, saveJDFile, removeJD }
}
