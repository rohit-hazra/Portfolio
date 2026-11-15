import { memo } from 'react'

function BackgroundEffects() {
  return (
    <div className="app-background pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  )
}

export default memo(BackgroundEffects)
