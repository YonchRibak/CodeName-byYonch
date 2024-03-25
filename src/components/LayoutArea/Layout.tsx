import Header from "./Header";
import Routing from "./Routing";
import "./LayoutArea.css";
import Aside from "./Aside";
import useGameContext from "@/Hooks/useGameContext";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";

function Layout(): JSX.Element {
  const [blueVictory, setBlueVictory] = useState(false);
  const [redVictory, setRedVictory] = useState(false);

  const { session } = useGameContext();
  const isCaptainScreen = window.location.pathname.includes("/captain");

  useEffect(() => {
    if (session.blueScore === 9) setBlueVictory(true);
    if (session.redScore === 8) setRedVictory(true);
  }, [session.blueScore, session.redScore]);

  return (
    <div className="h-full relative">
      {!isCaptainScreen && (
        <header>
          <Header />
        </header>
      )}

      <main className={"main-container " + (!isCaptainScreen ? "p-8" : "")}>
        {!isCaptainScreen && (
          <aside>
            <Aside />
          </aside>
        )}

        {blueVictory && (
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
        )}

        {redVictory && (
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
        )}
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
