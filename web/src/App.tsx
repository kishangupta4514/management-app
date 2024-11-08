import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage } from "./pages/LandingPage"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
          <Route index element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
