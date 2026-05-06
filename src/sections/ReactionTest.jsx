import { useEffect, useState } from 'react'

const panelStyle = {
  padding: '20px',
  borderRadius: '20px',
  textAlign: 'center',
}

const boardStyle = {
  width: '100%',
  border: 'none',
  borderRadius: '20px',
  padding: '56px 24px',
  fontSize: '28px',
  fontWeight: 800,
  fontFamily: 'inherit',
  transition: 'transform 0.15s ease, background-color 0.15s ease',
}

const primaryButtonStyle = {
  border: 'none',
  borderRadius: '999px',
  backgroundColor: '#111',
  color: '#fff',
  padding: '12px 22px',
  fontSize: '16px',
  fontWeight: 700,
}

function ReactionTest({ teamName }) {
  const [status, setStatus] = useState('ready')
  const [startedAt, setStartedAt] = useState(null)
  const [reactionMs, setReactionMs] = useState(null)
  const [bestMs, setBestMs] = useState(null)

  useEffect(() => {
    if (status !== 'waiting') {
      return undefined
    }

    const delay = Math.floor(Math.random() * 4000) + 1000
    const timeoutId = window.setTimeout(() => {
      setStartedAt(Date.now())
      setStatus('go')
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [status])

  const startRound = () => {
    setStartedAt(null)
    setReactionMs(null)
    setStatus('waiting')
  }

  const handleBoardClick = () => {
    if (status === 'waiting') {
      setStartedAt(null)
      setReactionMs(null)
      setStatus('result')
      return
    }

    if (status !== 'go' || startedAt === null) {
      return
    }

    const nextReactionMs = Date.now() - startedAt
    setStartedAt(null)
    setReactionMs(nextReactionMs)
    setBestMs((currentBest) => {
      if (currentBest === null || nextReactionMs < currentBest) {
        return nextReactionMs
      }

      return currentBest
    })
    setStatus('result')
  }

  const boardColors = {
    ready: { backgroundColor: '#f3f4f6', color: '#111' },
    waiting: { backgroundColor: '#dc2626', color: '#fff' },
    go: { backgroundColor: '#16a34a', color: '#fff' },
  }

  return (
    <section className="card">
      <h2>{teamName} Reaction Test</h2>
      <p style={{ margin: '0 0 20px', color: '#4b5563', lineHeight: 1.6 }}>
        Start the round, wait for green, and click as fast as you can.
      </p>

      {status === 'ready' && (
        <div style={{ ...panelStyle, backgroundColor: '#f9fafb' }}>
          <p style={{ margin: '0 0 18px', fontSize: '18px', fontWeight: 700 }}>
            Click start when you are ready.
          </p>
          <button type="button" style={primaryButtonStyle} onClick={startRound}>
            Start
          </button>
        </div>
      )}

      {(status === 'waiting' || status === 'go') && (
        <button
          type="button"
          onClick={handleBoardClick}
          style={{
            ...boardStyle,
            ...boardColors[status],
          }}
        >
          {status === 'waiting' ? 'Wait for green' : 'Click now'}
        </button>
      )}

      {status === 'result' && (
        <div style={{ ...panelStyle, backgroundColor: '#f9fafb' }}>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {reactionMs === null
              ? 'Too early. You clicked before the green signal.'
              : `Your reaction time: ${reactionMs} ms`}
          </p>
          <p style={{ margin: '12px 0 20px', color: '#4b5563' }}>
            {bestMs === null ? 'Set your first record on the next round.' : `Best record: ${bestMs} ms`}
          </p>
          <button type="button" style={primaryButtonStyle} onClick={startRound}>
            Try again
          </button>
        </div>
      )}
    </section>
  )
}

export default ReactionTest
