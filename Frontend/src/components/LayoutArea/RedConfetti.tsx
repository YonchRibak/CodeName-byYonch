import ConfettiExplosion from "react-confetti-explosion";

function RedConfetti(): JSX.Element {
  return (
    <>
      <ConfettiExplosion
        className="absolute left-60 top-60"
        force={1}
        height={"180vh"}
        width={3000}
        particleCount={250}
        colors={["#FFB6C1", "#FF69B4", "#FF1493", "#DC143C", "#B22222"]}
      />
      <ConfettiExplosion
        className="absolute right-60 bottom-60"
        force={1}
        height={"180vh"}
        width={3000}
        particleCount={250}
        colors={["#FFB6C1", "#FF69B4", "#FF1493", "#DC143C", "#B22222"]}
      />{" "}
    </>
  );
}

export default RedConfetti;
