import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">📘 Teacher Portal</div>
      <div className="navbar-box-links">
        <NavLink to="/dashboard/overview" className="nav-box" activeclassname="active">Overview</NavLink>
        <NavLink to="/dashboard/marks" className="nav-box" activeclassname="active">Marks</NavLink>
        <NavLink to="/dashboard/analysis" className="nav-box" activeclassname="active">Performance</NavLink>
        <NavLink to="/dashboard/profile" className="nav-box" activeclassname="active">Profile</NavLink>
        <NavLink to="/" className="nav-box logout-box">Logout</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
