import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkStyle =
    "block px-3 py-2 text-white rounded hover:bg-[#dc267f] transition font-medium";

  const activeLinkStyle = ({ isActive }) =>
    isActive ? "bg-[#f1732a] text-white px-3 py-2 rounded" : linkStyle;

  return (
    <div className="w-64 h-screen bg-[#2e2e2e] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#f1732a]">Teacher Portal</h2>
      <ul className="space-y-3">
        <li>
          <NavLink to="/dashboard/overview" className={activeLinkStyle}>
            📊 Dashboard Overview
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/students" className={activeLinkStyle}>
            🧑‍🏫 Student Marks
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/analysis" className={activeLinkStyle}>
            📈 Performance Analysis
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className={activeLinkStyle}>
            👤 Profile
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="mt-4 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white w-full text-left font-medium"
          >
            🔒 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
