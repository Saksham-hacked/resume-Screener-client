import CandidateRow from './CandidateRow'

export default function ResultsTable({ candidates, onViewDetails, onAddCompare }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
          <tr>
            {['Rank', 'Candidate', 'Final Score', 'Technical', 'Experience', 'Education', 'Soft Skills', 'Recommendation', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {candidates.map((c) => (
            <CandidateRow key={c.rank} candidate={c} onViewDetails={onViewDetails} onAddCompare={onAddCompare} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
