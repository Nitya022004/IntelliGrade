// LoginPage.js (Replace your existing LoginPage with this one)
import React, { useState } from "react";
import axios from "axios";
import SubjectSelector from "../components/SubjectSelector";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // CSS import

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/teacher/login", { name, password });
      setSubjects(res.data.teacher.subjects);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Invalid login. Please check your credentials.");
    }
  };

  const handleProceed = () => {
    localStorage.setItem("teacher", name);
    localStorage.setItem("subject", selectedSubject);
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src="/logo.png" alt="College Logo" className="login-logo" />
        <h1 className="login-heading">MS RAMAIAH INSTITUTE OF TECHNOLOGY</h1>

        {!isLoggedIn ? (
          <div className="login-form">
            <h2 className="login-subheading">Teacher Login</h2>
            <input
              type="text"
              placeholder="Enter Name"
              className="login-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          </div>
        ) : (
          <div className="login-form">
            <h3 className="login-welcome">Welcome, {name}!</h3>
            <SubjectSelector
              subjects={subjects}
              selected={selectedSubject}
              setSelected={setSelectedSubject}
            />
            <button
              onClick={handleProceed}
              disabled={!selectedSubject}
              className={`login-proceed ${
                selectedSubject ? "active" : "disabled"
              }`}
            >
              Proceed to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
