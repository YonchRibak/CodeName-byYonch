import Header from "./Header";
import Routing from "./Routing";
import "./LayoutArea.css";
import Aside from "./Aside";
import useGameContext from "@/Hooks/useGameContext";
import useDeclareVictors from "@/Hooks/useDeclareVictors";
import VictoryMsgAndConfetti from "./VictoryMsgAndConfetti";
import useConnectToSocketRoom from "@/Hooks/useConnectToSocketRoom";

function Layout(): JSX.Element {
  const { session, setSession } = useGameContext();
  const isCaptainScreen = window.location.pathname.includes("/captain");

  useConnectToSocketRoom(session, setSession);
  useDeclareVictors(session, setSession);

  console.log(session.victory);
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
            ? "h-[clamp(75vh,100%,90vh)] grid grid-cols-[1fr,6fr] gap-8 xl:p-8 sm:p-4 mr-4"
            : "h-full p-8 sm:p-4 grid items-center"
        }
      >
        {!isCaptainScreen && (
          <aside className="ml-4">
            <Aside />
          </aside>
        )}

        {session.victory && <VictoryMsgAndConfetti />}
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
