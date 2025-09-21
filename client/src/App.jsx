import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MetricsPage from "./pages/MetricsPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";

//AuthProvider -> component that wraps application to provide authentication context and state such as current user's log in status and authentication functions to its child components
//useAuth hook is custom hook that components use to easily access said authentication context
import { AuthProvider, useAuth } from "./hooks/useAuth.js"; //custom authentication context that tracks whos locgged in

//only renders children if user is logged in
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />; //navigate to /login if not logged in
}

//todo in future: put routes in separate file for more modular code

//App component
//<Routes> block decides what main page to render (Login, metrics, progress)
//Metrics and progress should be protected -> use PrivateRoute
export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route
          path="/metrics"
          element={
            <PrivateRoute>
              <MetricsPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <ProgressPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/metrics" replace />} />
      </Routes>
    </AuthProvider>
  );
}
