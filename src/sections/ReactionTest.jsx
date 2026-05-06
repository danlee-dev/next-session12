// Import the React hooks used in this component.
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

// Define the reaction test component and receive the team name.
function ReactionTest({ teamName }) {
  // Track which screen the user should currently see.
  const [status, setStatus] = useState('ready')
  // Store the moment the board turns green.
  const [startedAt, setStartedAt] = useState(null)
  // Store the measured reaction time for the current round.
  const [reactionMs, setReactionMs] = useState(null)
  // Store the best reaction time seen so far.
  const [bestMs, setBestMs] = useState(null)

  // Start the timer logic whenever the waiting phase begins.
  useEffect(() => {
    // Skip the timer unless the game is waiting to turn green.
    if (status !== 'waiting') {
      // Nothing needs cleanup when no timer was created.
      return undefined
    }

    // Pick a random delay between 1 and 5 seconds.
    const delay = Math.floor(Math.random() * 4000) + 1000
    // Schedule the switch from red to green after the delay.
    const timeoutId = window.setTimeout(() => {
      // Record the exact start time for reaction measurement.
      setStartedAt(Date.now())
      // Move the UI into the go phase.
      setStatus('go')
    // Use the random delay for this round.
    }, delay)

    // Clear the timeout if the effect is cleaned up early.
    return () => window.clearTimeout(timeoutId)
  // Re-run the effect whenever the status changes.
  }, [status])

  // Reset round data and move into the waiting phase.
  const startRound = () => {
    // Clear any previous green-start timestamp.
    setStartedAt(null)
    // Clear any previous reaction result.
    setReactionMs(null)
    // Show the red waiting screen.
    setStatus('waiting')
  // Finish the start-round handler.
  }

  // Handle clicks on the main reaction board.
  const handleBoardClick = () => {
    // If the user clicked during red, mark the round as failed.
    if (status === 'waiting') {
      // Remove any leftover start time.
      setStartedAt(null)
      // Keep the result empty because the user clicked too early.
      setReactionMs(null)
      // Move to the result screen.
      setStatus('result')
      // Stop processing after the early-click failure.
      return
    // Finish the early-click branch.
    }

    // Ignore clicks that are not valid reaction attempts.
    if (status !== 'go' || startedAt === null) {
      // Exit without changing anything on invalid clicks.
      return
    // Finish the invalid-click guard.
    }

    // Compute the reaction time from green to click.
    const nextReactionMs = Date.now() - startedAt
    // Clear the stored green-start timestamp for the finished round.
    setStartedAt(null)
    // Save the current round's measured time.
    setReactionMs(nextReactionMs)
    // Update the best score if the new result is faster.
    setBestMs((currentBest) => {
      // Replace the best score when this round is the new record.
      if (currentBest === null || nextReactionMs < currentBest) {
        // Return the improved best score.
        return nextReactionMs
      // Finish the best-score check.
      }

      // Keep the existing best score when it is still faster.
      return currentBest
    // Finish the best-score updater.
    })
    // Show the result screen after recording the time.
    setStatus('result')
  // Finish the board click handler.
  }

  const boardColors = {
    ready: { backgroundColor: '#f3f4f6', color: '#111' },
    waiting: { backgroundColor: '#dc2626', color: '#fff' },
    go: { backgroundColor: '#16a34a', color: '#fff' },
  }

  // Render the correct UI for the current game status and outer card wrapper.
  return (
    <section className="card">
      {/* Show the section title with the team name. */}
      <h2>{teamName} Reaction Test</h2>
      <p style={{ margin: '0 0 20px', color: '#4b5563', lineHeight: 1.6 }}>
        {/* Explain how the reaction test works. */}
        Start the round, wait for green, and click as fast as you can.
      </p>

      {/* Render the ready screen before the round starts. */}
      {status === 'ready' && (
        <div style={{ ...panelStyle, backgroundColor: '#f9fafb' }}>
          <p style={{ margin: '0 0 18px', fontSize: '18px', fontWeight: 700 }}>
            {/* Ask the user to begin when ready. */}
            Click start when you are ready.
          </p>
          <button type="button" style={primaryButtonStyle} onClick={startRound}>
            {/* Label the start button. */}
            Start
          </button>
        </div>
      )}

      {/* Render the reaction board during waiting and go states. */}
      {(status === 'waiting' || status === 'go') && (
        <button
          type="button"
          onClick={handleBoardClick}
          style={{
            ...boardStyle,
            ...boardColors[status],
          }}
        >
          {/* Change the board message based on the current phase. */}
          {status === 'waiting' ? 'Wait for green' : 'Click now'}
        </button>
      )}

      {/* Render the result screen after the round ends. */}
      {status === 'result' && (
        <div style={{ ...panelStyle, backgroundColor: '#f9fafb' }}>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
            {/* Choose between the early-click message and the measured result. */}
            {reactionMs === null
              ? 'Too early. You clicked before the green signal.'
              : `Your reaction time: ${reactionMs} ms`}
          </p>
          <p style={{ margin: '12px 0 20px', color: '#4b5563' }}>
            {/* Show either the first-record hint or the best score. */}
            {bestMs === null ? 'Set your first record on the next round.' : `Best record: ${bestMs} ms`}
          </p>
          <button type="button" style={primaryButtonStyle} onClick={startRound}>
            {/* Label the retry button. */}
            Try again
          </button>
        </div>
      )}
    </section>
  )
// Finish the component function definition.
}

// Export the component for use in other files.
export default ReactionTest
