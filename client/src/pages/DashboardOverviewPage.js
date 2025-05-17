// DashboardOverviewPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardOverviewPage.css";

const DashboardOverviewPage = () => {
  const navigate = useNavigate();
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div className="dashboard-overview-container">
      <Sidebar />
      <div className="overview-content">
        <h2>📊 Dashboard Overview</h2>
        <p>
          Welcome <strong>{teacher}</strong>! You are currently viewing the overview
          page for <strong>{subject}</strong>.
        </p>
        <img src="/overview-sample.png" alt="Overview Sample" className="overview-image" />

        <button className="back-button" onClick={() => navigate("/dashboard")}>⬅️ Back to Dashboard</button>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
