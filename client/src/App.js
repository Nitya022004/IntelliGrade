import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentMarksPage from "./pages/StudentMarksPage"; // <-- this is the missing one
import AnalysisPage from "./pages/AnalysisPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Sidebar Pages */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/students" element={<StudentMarksPage />} />
        <Route path="/dashboard/analysis" element={<AnalysisPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
