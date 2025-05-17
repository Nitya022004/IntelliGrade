import React, { useState } from "react";
import axios from "axios";
import SubjectSelector from "../components/SubjectSelector";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/teacher/login", {
        name,
        password,
      });
      setSubjects(res.data.teacher.subjects);
      setIsLoggedIn(true);
    } catch (err) {
      alert("Invalid login. Please check your credentials.");
    }
  };

  const handleProceed = () => {
    // Store teacher and subject in localStorage or context if needed
    localStorage.setItem("teacher", name);
    localStorage.setItem("subject", selectedSubject);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      {!isLoggedIn ? (
        <>
          <h2>Teacher Login</h2>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h3>Welcome, {name}!</h3>
          <SubjectSelector
            subjects={subjects}
            selected={selectedSubject}
            setSelected={setSelectedSubject}
          />
          <button
            onClick={handleProceed}
            disabled={!selectedSubject}
          >
            Proceed to Dashboard
          </button>
        </>
      )}
    </div>
  );
}

export default LoginPage;
