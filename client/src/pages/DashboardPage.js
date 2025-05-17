import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div className="flex">
      <Sidebar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome, {teacher} 👋</h2>
        <p className="dashboard-subject">You are currently managing the subject: <strong>{subject}</strong>.</p>
        <p className="dashboard-note">
          Use the sidebar to view student marks, analyze performance, or update your profile.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
