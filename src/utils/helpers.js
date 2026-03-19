export const getScoreColor = (score) => {
  if (score >= 70) return 'text-green-600'
  if (score >= 45) return 'text-amber-600'
  return 'text-red-600'
}

export const getBarColor = (score) => {
  if (score >= 70) return 'bg-green-500'
  if (score >= 45) return 'bg-amber-400'
  return 'bg-red-400'
}

export const exportToCSV = (candidates, jdTitle) => {
  const headers = ['Rank', 'Candidate', 'Final Score', 'Technical', 'Experience', 'Education', 'Soft Skills', 'Recommendation']
  const rows = candidates.map((c) => [
    c.rank,
    c.fileName,
    c.scores.final,
    c.scores.technicalSkills,
    c.scores.experience,
    c.scores.education,
    c.scores.softSkills,
    c.recommendation,
  ])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `screening-${jdTitle}-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
