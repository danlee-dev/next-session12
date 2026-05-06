// ─────────────────────────────────────────────
//  NicknameSlot — 별명 슬롯머신
//  담당자: ____________
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react'

const NICKNAMES = [
  '매콤한 너구리', '잠 못 자는 코더', '커피 중독자',
  '회의 지각러', '디버깅 마스터', '키보드 파괴자',
  '주말 출근러', '점심 메뉴 결정장애', '깃 충돌 마법사',
  '에러 메시지 해독가',
]

function NicknameSlot({ teamName, members }) {
  const [currentMember, setCurrentMember] = useState(members[0] ?? '')
  const [currentNickname, setCurrentNickname] = useState(NICKNAMES[0])
  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    if (!isSpinning) return
    const id = setInterval(() => {
      setCurrentMember(members[Math.floor(Math.random() * members.length)])
      setCurrentNickname(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)])
    }, 80)
    return () => clearInterval(id)
  }, [isSpinning, members])

  return (
    <section className="card">
      <h2>{teamName} 별명 슬롯머신</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
        <div className="slot-box">{currentMember}</div>
        <div className="slot-box">{currentNickname}</div>
      </div>
      <button onClick={() => setIsSpinning(prev => !prev)}>
        {isSpinning ? '멈추기' : '돌리기'}
      </button>
    </section>
  )
}

export default NicknameSlot
