import React from "react";
import Navbar from "../components/Navbar";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const teacher = localStorage.getItem("teacher");
  const subject = localStorage.getItem("subject");

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-box">
          <h2>👤 Teacher Profile</h2>
          <p><strong>Name:</strong> {teacher}</p>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Email:</strong> {teacher.toLowerCase()}@college.edu</p>
          <p><strong>Department:</strong> Computer Science</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
