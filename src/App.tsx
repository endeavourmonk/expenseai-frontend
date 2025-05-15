import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
