export interface StatusViewProps {
  loading?: boolean
  error?: string | null
  type?: 'loading' | 'error'
  message?: string | null
  onRetry?: () => void
}

export default function StatusView({
  loading,
  error,
  type,
  message,
  onRetry,
}: StatusViewProps) {
  const isLoading = Boolean(loading || type === 'loading')
  const errorMessage = error || (type === 'error' ? message : null)

  if (isLoading) {
    return (
      <div className="status-container loading-status" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <p className="status-text">טוען מתכונים מעולים מהרשת...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="status-container error-status" role="alert">
        <span className="error-icon" aria-hidden="true">⚠️</span>
        <h3 className="error-title">אירעה שגיאה בטעינת הנתונים</h3>
        <p className="error-text">{errorMessage}</p>
        {onRetry && (
          <button type="button" className="retry-btn" onClick={onRetry}>
            🔄 נסו שוב
          </button>
        )}
      </div>
    )
  }

  return null
}
