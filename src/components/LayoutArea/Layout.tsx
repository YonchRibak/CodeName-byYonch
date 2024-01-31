import Header from "./Header";
import Routing from "./Routing";
import "./LayoutArea.css";
import Aside from "./Aside";

function Layout(): JSX.Element {
  return (
    <div className="h-full">
      <header>
        <Header />
      </header>

      <main className="main-container">
        <aside>
          <Aside />
        </aside>
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
