import Header from "./Header";
import Routing from "./Routing";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default Layout;
