// DashboardOverviewPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/DashboardOverviewPage.css";

const DashboardOverviewPage = () => {
  const navigate = useNavigate();
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div className="dashboard-overview-wrapper">
      <Navbar />
      <div className="overview-content">
        <h2>📊 Dashboard Overview</h2>
        <p>
          Welcome <strong>{teacher}</strong>! You are currently viewing the overview page for <strong>{subject}</strong>.
        </p>

        <div className="dashboard-description">
          <p>This dashboard provides a centralized view of all your subject-related activities:</p>
          <ul>
            <li>📌 View and update student marks</li>
            <li>📊 Analyze pass percentages and yearly performance trends</li>
            <li>📁 Download PDF reports for class insights</li>
            <li>👩‍🏫 Access and manage your profile information</li>
          </ul>
        </div>

        <button className="back-button" onClick={() => navigate("/dashboard")}>
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
