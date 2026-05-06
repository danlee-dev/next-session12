// React에서 상태 관리와 생명주기 기능을 사용하기 위해 Hook을 불러옵니다.
import { useState, useEffect } from "react";

// 부모 컴포넌트로부터 팀 이름(teamName)과 멤버 명단(members)을 전달받습니다.
function TeamIntro({ teamName, members }) {
  // 팀의 모토나 슬로건들을 배열 형태로 저장합니다.
  const slogans = [
    "혁신을 꿈꾸는 우리",
    "언제나 함께 성장하는 팀",
    "최고의 코드를 만드는 중",
  ];

  // 현재 화면에 보여줄 슬로건의 인덱스를 관리하는 상태(state)입니다. (useState 활용)
  const [index, setIndex] = useState(0);

  // 컴포넌트가 나타날 때 3초마다 슬로건 인덱스를 변경하는 타이머를 설정합니다. (useEffect 활용)
  useEffect(() => {
    // 3000ms(3초)마다 실행되는 인터벌 함수를 생성합니다.
    const timer = setInterval(() => {
      // 이전 인덱스 값에 1을 더하고, 배열 길이를 넘지 않게 나머지 연산(%)을 사용합니다.
      setIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 3000);

    // 컴포넌트가 사라질 때 타이머를 제거하여 메모리 누수를 방지합니다.
    return () => clearInterval(timer);
    // 의존성 배열에 slogans.length를 넣어 데이터 변경에 대응합니다.
  }, [slogans.length]);

  // 실제 브라우저에 렌더링될 HTML 구조를 반환합니다.
  return (
    // 전체 섹션을 감싸는 카드 스타일의 컨테이너입니다.
    <section
      className="card"
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      {/* props로 받은 팀 이름을 제목으로 표시합니다. */}
      <h2 style={{ color: "#2c3e50" }}>{teamName}</h2>

      {/* useEffect와 useState로 매번 바뀌는 슬로건을 보여주는 강조 영역입니다. */}
      <div
        className="slogan-box"
        style={{ margin: "15px 0", fontWeight: "bold", color: "#3498db" }}
      >
        <p>"{slogans[index]}"</p>
      </div>

      {/* props로 받은 멤버 배열을 쉼표로 구분된 문자열로 변환하여 출력합니다. */}
      <p>
        <strong>팀원:</strong> {members.join(", ")}
      </p>
    </section>
  );
}

// 다른 파일에서 이 컴포넌트를 사용할 수 있도록 내보냅니다.
export default TeamIntro;
