import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-900 m-0">Welcome to the App</h1>
          <button
            onClick={handleSignOut}
            className="px-5 py-2.5 bg-white text-blue-500 border border-blue-500 rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:text-white"
          >
            Sign Out
          </button>
        </div>

        <div className="text-center p-10 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl font-semibold mx-auto mb-5">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 m-0 mb-2">
            Hello, {user?.firstName} {user?.lastName}!
          </h2>
          <p className="text-gray-600 text-base m-0">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
    </div>
  );
}
