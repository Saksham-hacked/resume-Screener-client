import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getAllSessions, getSession, deleteSession } from '../services/api'

export default function useSessions() {
  const [sessions, setSessions] = useState([])
  const [session, setSession] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllSessions()
      setSessions(res.data.sessions)
    } catch {
      toast.error('Failed to load session history')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSession = useCallback(async (id) => {
    setLoading(true)
    try {
      const res = await getSession(id)
      setSession(res.data.session)
      setCandidates(res.data.candidates)
    } catch {
      toast.error('Failed to load session details')
    } finally {
      setLoading(false)
    }
  }, [])

  const removeSession = async (id) => {
    try {
      await deleteSession(id)
      setSessions((prev) => prev.filter((s) => s._id !== id))
      toast.success('Session deleted')
    } catch {
      toast.error('Failed to delete session')
    }
  }

  return { sessions, session, candidates, loading, fetchSessions, fetchSession, removeSession }
}
