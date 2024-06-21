import ConfettiExplosion from "react-confetti-explosion";

function BlueConfetti(): JSX.Element {
  return (
    <>
      <ConfettiExplosion
        className="absolute left-60 top-60"
        force={1}
        height={"180vh"}
        width={3000}
        particleCount={250}
        colors={["#ADD8E6", "#6495ED", "#1E90FF", "#4682B4", "#483D8B"]}
      />{" "}
      <ConfettiExplosion
        className="absolute right-60 bottom-60"
        force={1}
        height={"180vh"}
        width={3000}
        particleCount={250}
        colors={["#ADD8E6", "#6495ED", "#1E90FF", "#4682B4", "#483D8B"]}
      />
    </>
  );
}

export default BlueConfetti;
