import React from "react";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">👤 Teacher Profile</h2>
        <p><strong>Name:</strong> {teacher}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Email:</strong> {teacher.toLowerCase()}@college.edu</p>
        <p><strong>Department:</strong> Computer Science</p>
      </div>
    </div>
  );
};

export default ProfilePage;
