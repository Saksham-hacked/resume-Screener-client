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
  const headers = [
    'Rank', 'Name', 'Email', 'Phone', 'File',
    'Final Score', 'Technical', 'Experience', 'Education', 'Soft Skills', 'Recommendation',
    'Top Skills', 'Strengths', 'Gaps'
  ]

  const escape = (val) => {
    const s = String(val ?? '')
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }

  const rows = candidates.map((c) => [
    c.rank,
    c.candidateName  || '',
    c.candidateEmail || '',
    c.candidatePhone || '',
    c.fileName,
    c.scores.final,
    c.scores.technicalSkills,
    c.scores.experience,
    c.scores.education,
    c.scores.softSkills,
    c.recommendation,
    (c.topSkills  || []).join('; '),
    (c.strengths  || []).join('; '),
    (c.gaps       || []).join('; '),
  ].map(escape))

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
