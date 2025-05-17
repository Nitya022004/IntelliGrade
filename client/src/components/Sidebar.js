import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const linkStyle = "block px-2 py-1 hover:bg-gray-800 rounded";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Teacher Portal</h2>
      <ul className="space-y-3">
        <li>
          <NavLink to="/dashboard" className={linkStyle}>
            📊 Dashboard Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/students" className={linkStyle}>
            🧑‍🏫 Student Marks
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/analysis" className={linkStyle}>
            📈 Performance Analysis
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className={linkStyle}>
            👤 Profile
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="text-red-400">
            🔒 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
