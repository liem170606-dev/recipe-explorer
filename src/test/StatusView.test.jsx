import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import StatusView from '../components/StatusView'

describe('רכיב מצבי רשת (StatusView)', () => {
  it('מרנדר אנימציית טעינה והודעת טעינה כראוי', () => {
    render(<StatusView loading={true} />)

    expect(screen.getByText(/טוען מתכונים/i)).toBeInTheDocument()
  })

  it('מרנדר הודעת שגיאה וכפתור ניסיון חוזר בלחיצה', () => {
    const handleRetry = vi.fn()

    render(
      <StatusView
        loading={false}
        error="תקלת רשת בשרת"
        onRetry={handleRetry}
      />
    )

    expect(screen.getByText('תקלת רשת בשרת')).toBeInTheDocument()

    const retryButton = screen.getByRole('button', { name: /נסו שוב/i })
    fireEvent.click(retryButton)

    expect(handleRetry).toHaveBeenCalledTimes(1)
  })
})
