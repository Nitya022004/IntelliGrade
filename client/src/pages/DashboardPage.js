import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-2">Welcome, {teacher} 👋</h2>
        <p className="text-lg text-gray-700">
          You are currently managing the subject: <strong>{subject}</strong>.
        </p>
        <p className="mt-4 text-md">
          Use the sidebar to view student marks, analyze performance, or update your profile.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
