import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Layout from "./components/LayoutArea/Layout";
import "./i18n";
import { ThemeProvider } from "./components/theme-provider";
import { Suspense } from "react";
import useSetTitle from "./Hooks/useSetTitle";
import { GameProvider } from "./components/game-provider";
import { RevealCardsProvider } from "./components/reveal-cards-provider";

const queryClient = new QueryClient();

function App() {
  useSetTitle();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <RevealCardsProvider>
              <Layout />
            </RevealCardsProvider>
          </GameProvider>
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
