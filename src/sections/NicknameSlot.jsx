// ─────────────────────────────────────────────
//  NicknameSlot — 별명 슬롯머신
//  담당자: ____________
// ─────────────────────────────────────────────

// 상태 관리와 사이드 이펙트를 쓰기 위해 불러옴
import { useState, useEffect } from 'react'

// 오른쪽 슬롯에서 무작위로 뽑을 별명 목록
const NICKNAMES = [
  '매콤한 너구리', '잠 못 자는 코더', '커피 중독자',
  '회의 지각러', '디버깅 마스터', '키보드 파괴자',
  '주말 출근러', '점심 메뉴 결정장애', '깃 충돌 마법사',
  '에러 메시지 해독가',
]

const S = {
  machine: {
    background: 'linear-gradient(160deg, #7a5550 0%, #5c3d3a 100%)',
    borderRadius: '28px 28px 20px 20px',
    padding: '28px 32px 32px',
    boxShadow:
      '0 8px 32px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.12), inset 0 -3px 0 rgba(0,0,0,0.3)',
    minHeight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  title: {
    margin: 0,
    color: '#e8c9a0',
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '0.06em',
    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  windows: {
    display: 'flex',
    gap: '16px',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: '16px',
    padding: '14px 20px',
    boxShadow:
      'inset 0 4px 12px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,255,255,0.05)',
  },
  window: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  box: {
    width: '160px',
    height: '72px',
    background: 'linear-gradient(180deg, #f5f0eb 0%, #fff 40%, #f5f0eb 100%)',
    borderRadius: '10px',
    border: '3px solid #c9956c',
    boxShadow:
      '0 0 0 1px rgba(0,0,0,0.15), inset 0 2px 8px rgba(0,0,0,0.12), 0 3px 0 #9e6645',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
    fontWeight: 700,
    color: '#3a2420',
    textAlign: 'center',
    padding: '4px 10px',
    lineHeight: 1.3,
    overflow: 'hidden',
  },
  label: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#c9956c',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  // 레버 영역
  leverArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    width: '72px',        // 옆으로 딸깍할 공간
  },
  leverKnob: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 30%, #f0dfc0, #c9956c 60%, #9e6645)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.3)',
    border: '2px solid #9e6645',
    flexShrink: 0,
  },
  leverRod: {
    width: '10px',
    height: '80px',
    background: 'linear-gradient(90deg, #b5784a 0%, #e8c9a0 45%, #b5784a 100%)',
    borderRadius: '5px',
    boxShadow: '2px 0 4px rgba(0,0,0,0.3)',
  },
  leverMount: {
    width: '26px',
    height: '18px',
    background: 'linear-gradient(180deg, #9e6645 0%, #7a4a28 100%)',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)',
    flexShrink: 0,
  },
}

function NicknameSlot({ teamName, members }) {
  // 왼쪽 슬롯에 보여줄 현재 팀원 이름
  const [currentMember, setCurrentMember] = useState(members[0] ?? '')
  // 오른쪽 슬롯에 보여줄 현재 별명
  const [currentNickname, setCurrentNickname] = useState(NICKNAMES[0])
  // 슬롯이 돌아가고 있는지 여부 (true면 80ms마다 갱신)
  const [isSpinning, setIsSpinning] = useState(false)

  // isSpinning이 true일 때만 80ms마다 팀원·별명을 무작위로 바꿔줌
  useEffect(() => {
    // 멈춰있으면 아무것도 하지 않음
    if (!isSpinning) return
    // setInterval id를 잡아둬야 나중에 정리할 수 있음
    const id = setInterval(() => {
      // members 배열에서 무작위 인덱스로 팀원 선택
      setCurrentMember(members[Math.floor(Math.random() * members.length)])
      // NICKNAMES 배열에서 무작위 인덱스로 별명 선택
      setCurrentNickname(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)])
    }, 80)
    // 컴포넌트가 사라지거나 isSpinning이 바뀔 때 인터벌 정리 (메모리 누수 방지)
    return () => clearInterval(id)
  // isSpinning이 바뀔 때, members가 바뀔 때 이 effect를 다시 실행
  }, [isSpinning, members])

  // 돌아가는 중엔 슬롯 창을 살짝 흐리게 해서 빠르게 돌아가는 느낌을 줌
  const boxStyle = isSpinning ? { ...S.box, filter: 'blur(0.6px)' } : S.box

  return (
    <>
      <style>{`
        @keyframes slotShake {
          from { transform: translateY(-1px); }
          to   { transform: translateY(1px); }
        }
        .slot-shaking { animation: slotShake 0.08s linear infinite alternate; }

        .lever-arm {
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: bottom center;
          transition: transform 0.28s cubic-bezier(0.34, 1.7, 0.64, 1);
        }
        .lever-arm.clicked {
          transform: rotate(22deg);
        }
        .lever-area:hover .lever-arm:not(.clicked) {
          transform: rotate(6deg);
        }
      `}</style>
      <section className="card" style={S.machine}>
        <h2 style={S.title}>{teamName} 별명 슬롯머신</h2>

        {/* 슬롯 창과 레버를 가로로 나란히 배치 */}
        <div style={S.body}>
          {/* 팀원(왼쪽)·별명(오른쪽) 슬롯 창 묶음 */}
          <div style={S.windows}>
            <div style={S.window}>
              {/* 돌아가는 중이면 slot-shaking 클래스로 흔들림 애니메이션 적용 */}
              <div style={boxStyle} className={isSpinning ? 'slot-shaking' : ''}>
                {currentMember}
              </div>
              <span style={S.label}>팀원</span>
            </div>
            <div style={S.window}>
              {/* 팀원 슬롯과 동일한 방식으로 별명 표시 */}
              <div style={boxStyle} className={isSpinning ? 'slot-shaking' : ''}>
                {currentNickname}
              </div>
              <span style={S.label}>별명</span>
            </div>
          </div>

          {/* 클릭하면 isSpinning을 반전시키는 레버 */}
          <div
            style={S.leverArea}
            className="lever-area"
            onClick={() => setIsSpinning(prev => !prev)}
          >
            {/* isSpinning이면 clicked 클래스로 레버가 옆으로 딸깍 */}
            <div className={`lever-arm${isSpinning ? ' clicked' : ''}`}>
              <div style={S.leverKnob} />
              <div style={S.leverRod} />
            </div>
            <div style={S.leverMount} />
          </div>
        </div>
      </section>
    </>
  )
}

export default NicknameSlot
