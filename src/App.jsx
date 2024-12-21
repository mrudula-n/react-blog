import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProviders } from "./providers/AppProviders";
import { router } from "./router/index";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PerformanceMonitor from "./utils/PerformanceMonitor";


function App() {

  return (
    <div>
      <ErrorBoundary>
        <AuthProvider>
          <AppProviders>
          <PerformanceMonitor />
            <RouterProvider router={router} />
          </AppProviders>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
