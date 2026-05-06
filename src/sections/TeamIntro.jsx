import { useState, useEffect } from "react";

function TeamIntro({ teamName, members }) {
  // 슬로건 데이터
  const slogans = [
    "WE DREAM INNOVATION",
    "GROW TOGETHER, ALWAYS",
    "CRAFTING THE BEST CODE",
  ];

  // 슬로건 인덱스 상태 관리 (useState)
  const [index, setIndex] = useState(0);

  // 4초마다 슬로건 변경 (useEffect)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slogans.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slogans.length]);

  // 컴포넌트 세부 스타일 설정
  const styles = {
    container: {
      padding: "60px 40px",
      margin: "40px auto",
      maxWidth: "800px",
      borderRadius: "0px",
      backgroundColor: "#ffffff",
      border: "4px solid #000000",
      boxShadow: "15px 15px 0px rgba(0,0,0,0.9)",
      textAlign: "center",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "5rem",
      fontWeight: "900",
      color: "#000000",
      textTransform: "uppercase",
      letterSpacing: "-3px",
      margin: "0 0 40px 0",
      lineHeight: "1",
    },
    sloganBox: {
      padding: "20px",
      backgroundColor: "#000000",
      borderRadius: "0px",
      marginBottom: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70px",
    },
    sloganText: {
      fontSize: "1.3rem",
      color: "#ffffff",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "2px",
      margin: 0,
    },
    members: {
      fontSize: "1rem",
      color: "#000000",
      margin: "0 auto",
      paddingTop: "20px",
      borderTop: "2px solid #000000",
      display: "inline-block",
      letterSpacing: "0.5px",
    },
  };

  return (
    <section style={styles.container}>
      {/* 팀 이름 표시 (props) */}
      <h2 style={styles.title}>{teamName}</h2>

      {/* 슬로건 영역 (state 활용) */}
      <div style={styles.sloganBox}>
        <p style={styles.sloganText}>{slogans[index]}</p>
      </div>

      {/* 멤버 목록 표시 (props) */}
      <div style={styles.members}>
        <span style={{ fontWeight: "800", marginRight: "15px" }}>MEMBERS</span>
        {members.join(" / ")}
      </div>
    </section>
  );
}

export default TeamIntro;
