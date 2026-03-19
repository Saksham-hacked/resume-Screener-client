const DIMS = [
  { label: 'Technical Skills', key: 'technicalSkills', color: 'accent-green-600' },
  { label: 'Experience', key: 'experience', color: 'accent-blue-500' },
  { label: 'Education', key: 'education', color: 'accent-purple-500' },
  { label: 'Soft Skills', key: 'softSkills', color: 'accent-orange-500' },
]

export default function WeightageSliders({ weightages, onChange }) {
  const total = Object.values(weightages).reduce((a, b) => a + Number(b), 0)
  const allZero = total === 0

  const handleChange = (key, value) => {
    onChange({ ...weightages, [key]: Number(value) })
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-gray-800">Screening Priorities</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Set importance for each factor independently — no need to balance them
        </p>
      </div>

      <div className="space-y-4">
        {DIMS.map((d) => (
          <div key={d.key}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-700 font-medium">{d.label}</label>
              <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {weightages[d.key]}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={weightages[d.key]}
              onChange={(e) => handleChange(d.key, e.target.value)}
              className={`w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 ${d.color}`}
            />
          </div>
        ))}
      </div>

      {allZero ? (
        <div className="flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 bg-red-50 text-red-600">
          <span>⚠</span><span>At least one factor must be greater than 0</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 bg-green-50 text-green-700">
          <span>✓</span><span>Priorities set — scores will be weighted proportionally</span>
        </div>
      )}
    </div>
  )
}
