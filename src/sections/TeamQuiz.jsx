// ─────────────────────────────────────────────
//  TeamQuiz — 미니 퀴즈
//  담당자: 이성민
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react'

// 팀원에 대한 3문항 — answerIndex는 members 배열 기준
const QUESTIONS = [
  { question: '어제 새벽 3시까지 안 자고 코딩한 사람은?', answerIndex: 0 },
  { question: '커피 없으면 손이 떨리는 사람은?', answerIndex: 1 },
  { question: '회의 시작 30초 전에 오는 사람은?', answerIndex: 2 },
]

function TeamQuiz({ teamName, members }) {
  // 현재 문제 번호 (0~2), 3이 되면 결과 화면
  const [currentIndex, setCurrentIndex] = useState(0)
  // 맞춘 문제 수
  const [score, setScore] = useState(0)
  // 유저가 클릭한 보기 index (null이면 아직 안 고름)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  // selectedAnswer가 정해지면 1.5초 후 자동으로 다음 문제로 이동
  useEffect(() => {
    // 아직 선택 안 했으면 아무것도 안 함
    if (selectedAnswer === null) return

    const timer = setTimeout(() => {
      // 다음 문제로 넘기고, 선택 초기화
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
    }, 1500)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer)
  }, [selectedAnswer])

  // 보기 클릭 핸들러
  const handleSelect = (index) => {
    // 이미 선택했으면 중복 클릭 무시
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    // 정답이면 점수 +1
    if (index === QUESTIONS[currentIndex].answerIndex) {
      setScore((prev) => prev + 1)
    }
  }

  // 다시 풀기 — 모든 state 초기화
  const handleReset = () => {
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
  }

  // 보기 버튼 색상 결정: 선택 후에만 정답/오답 표시
  const getButtonStyle = (index) => {
    const base = {
      display: 'block',
      width: '100%',
      padding: '12px 16px',
      fontSize: '15px',
      fontWeight: 600,
      border: '1px solid #ddd',
      borderRadius: '10px',
      background: '#fff',
      cursor: selectedAnswer !== null ? 'default' : 'pointer',
      transition: 'all 0.2s',
    }

    // 아직 선택 전이면 기본 스타일
    if (selectedAnswer === null) return base

    const isCorrect = index === QUESTIONS[currentIndex].answerIndex
    const isSelected = index === selectedAnswer

    if (isCorrect) {
      // 정답 보기는 초록
      return { ...base, background: '#d4edda', borderColor: '#28a745', color: '#155724' }
    }
    if (isSelected && !isCorrect) {
      // 골랐는데 틀린 보기는 빨강
      return { ...base, background: '#f8d7da', borderColor: '#dc3545', color: '#721c24' }
    }
    // 나머지는 흐리게
    return { ...base, opacity: 0.5 }
  }

  // --- 결과 화면 (3문제 다 풀었을 때) ---
  if (currentIndex >= QUESTIONS.length) {
    return (
      <section className="card">
        <h2>{teamName} 미니 퀴즈</h2>
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
          {QUESTIONS.length}문제 중 <strong>{score}</strong>개 맞았습니다!
        </p>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          {score === QUESTIONS.length
            ? '완벽! 팀을 정말 잘 알고 있네요.'
            : score >= 2
              ? '거의 다 맞혔어요!'
              : '팀원을 더 알아가 봐요!'}
        </p>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: 600,
            border: '1px solid #111',
            borderRadius: '999px',
            background: '#111',
            color: '#fff',
          }}
        >
          다시 풀기
        </button>
      </section>
    )
  }

  // --- 퀴즈 진행 화면 ---
  const current = QUESTIONS[currentIndex]

  return (
    <section className="card">
      <h2>{teamName} 미니 퀴즈</h2>

      {/* 진행 상태 표시 */}
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px' }}>
        {currentIndex + 1} / {QUESTIONS.length}
      </p>

      {/* 문제 */}
      <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
        {current.question}
      </p>

      {/* 보기 4개 — members 배열이 그대로 선택지 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {members.map((member, index) => (
          <button
            key={member}
            onClick={() => handleSelect(index)}
            style={getButtonStyle(index)}
          >
            {member}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TeamQuiz
