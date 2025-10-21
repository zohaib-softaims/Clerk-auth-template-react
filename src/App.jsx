import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import "./App.css";

// Loading component
function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
      }}
    >
      Loading...
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

// Public route wrapper (redirects to dashboard if already signed in)
function PublicRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
