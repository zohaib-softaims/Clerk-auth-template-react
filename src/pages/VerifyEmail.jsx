import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Check Your Email</h2>
        <p className="text-gray-600 text-center text-sm mb-8">We've sent a verification link to your email</p>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-5 text-sm leading-relaxed border-l-4 border-blue-500">
          <p>Please check your email and click the verification link to complete your sign up. You can close this window after clicking the link.</p>
        </div>

        <div className="text-center">
          <button onClick={() => navigate("/signin")} className="bg-none border-none text-blue-500 font-semibold cursor-pointer text-sm hover:underline">
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
