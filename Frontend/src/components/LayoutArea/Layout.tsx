import Header from "./Header";
import Routing from "./Routing";
import "./LayoutArea.css";
import Aside from "./Aside";
import useGameContext from "@/Hooks/useGameContext";
import { useState } from "react";
import useDeclareVictors from "@/Hooks/useDeclareVictors";
import BlueConfetti from "./BlueConfetti";
import RedConfetti from "./RedConfetti";
import useConnectToSocketRoom from "@/Hooks/useConnectToSocketRoom";

function Layout(): JSX.Element {
  const [victors, setVictors] = useState({
    redTeam: false,
    blueTeam: false,
  });

  const { session, setSession } = useGameContext();
  const isCaptainScreen = window.location.pathname.includes("/captain");

  useConnectToSocketRoom(session, setSession);
  useDeclareVictors(session, setVictors);
  
  return (
    <div className="h-full relative xl:p-4">
      {!isCaptainScreen && (
        <header>
          <Header />
        </header>
      )}

      <main
        className={
          !isCaptainScreen
            ? "h-[clamp(75vh,100%,90vh)] grid grid-cols-[1fr,6fr] gap-8 xl:p-8 sm:p-4"
            : "h-full p-8 sm:p-4 grid items-center"
        }
      >
        {!isCaptainScreen && (
          <aside>
            <Aside />
          </aside>
        )}

        {victors.blueTeam && <BlueConfetti />}
        {victors.redTeam && <RedConfetti />}
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
