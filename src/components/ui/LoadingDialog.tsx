// src/components/ui/LoadingDialog.tsx

interface LoadingDialogProps {
  open: boolean
  message?: string
}

export function LoadingDialog({ open, message = 'Memproses...' }: LoadingDialogProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          minWidth: '200px',
        }}
      >
        {/* Spinner */}
        <div className="relative w-12 h-12">
          {/* Ring luar */}
          <div
            className="absolute inset-0 rounded-full border-4 animate-spin"
            style={{
              borderColor: 'transparent',
              borderTopColor: 'var(--orange-primary)',
              borderRightColor: 'var(--orange-primary)',
            }}
          />
          {/* Ring dalam */}
          <div
            className="absolute inset-2 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'transparent',
              borderBottomColor: 'var(--blue-medium)',
              animationDirection: 'reverse',
              animationDuration: '0.6s',
            }}
          />
        </div>

        {/* Message */}
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {message}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Mohon tunggu sebentar...
        </p>
      </div>
    </div>
  )
}