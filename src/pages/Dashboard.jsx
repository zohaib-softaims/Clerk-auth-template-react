import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Resume Builder</h1>
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <h2>
            Hello, {user?.firstName} {user?.lastName}!
          </h2>
          <p className="user-email">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>

        <div className="dashboard-content">
          <h3>Welcome to your Resume Builder</h3>
          <p>Start building your professional resume here!</p>

          <div className="quick-actions">
            <button className="action-btn primary">Create New Resume</button>
            <button className="action-btn secondary">View Templates</button>
          </div>
        </div>
      </div>
    </div>
  );
}
