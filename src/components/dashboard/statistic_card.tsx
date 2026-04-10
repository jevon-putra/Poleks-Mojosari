interface StatisticCardProps {
  label: string
  isMonth: boolean
  curentValue: number
  lasValue: number
  accent: 'orange' | 'blue'
}

export function StatisticCard({ label, isMonth, curentValue, lasValue, accent }: StatisticCardProps) {
  const persen = lasValue === 0
    ? null
    : Math.round(((curentValue - lasValue) / lasValue) * 100)

  const isUpTrend = (curentValue - lasValue) >= 0
  const accentColor = accent === 'orange' ? 'var(--orange-primary)' : 'var(--blue-medium)'

  return (
    <div className="card px-5 py-4 flex flex-col gap-3">
        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            {label}
        </p>

        <div>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
                {curentValue.toLocaleString('id-ID')}
            </p>

            <div className="flex items-center gap-2 mt-1">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {isMonth ? 'Bulan lalu' : 'Minggu lalu'}: {lasValue.toLocaleString('id-ID')}
                </p>

                {persen !== null && (
                    <div
                        className="text-xs font-medium px-2 py-0.5 rounded-full w-fit"
                        style={{
                            background: isUpTrend ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                            color: isUpTrend ? '#22c55e' : '#ef4444',
                        }}
                    >
                        {isUpTrend ? '▲' : '▼'} {Math.abs(persen)}% vs {isMonth ? 'bulan lalu' : 'minggu lalu'}
                    </div>
                )}
            </div>
        </div>

    </div>
  )
}