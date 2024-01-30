import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Layout from "./components/LayoutArea/Layout";
import "./i18n";
import { ThemeProvider } from "./components/theme-provider";
import { Suspense } from "react";
import useSetTitle from "./Hooks/useSetTitle";

const queryClient = new QueryClient();
function App() {
  useSetTitle();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
