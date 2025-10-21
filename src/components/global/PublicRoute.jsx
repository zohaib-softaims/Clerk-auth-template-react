import { useAuth } from "@clerk/clerk-react";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
