import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Check Your Email</h2>
        <p className="auth-subtitle">We've sent a verification link to your email</p>

        <div className="verification-instructions">
          <p>Please check your email and click the verification link to complete your sign up. You can close this window after clicking the link.</p>
        </div>

        <div className="verification-actions">
          <button onClick={() => navigate("/signin")} className="toggle-btn">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
