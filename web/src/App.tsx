import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { AdminPage } from "./pages/AdminPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminLogin } from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
