import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import Sidebar from "@/components/Sidebar";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <div className="w-full flex h-svh max-h-svh">
      <Sidebar />
      <div className="h-full flex-1">
        <div className="flex h-full flex-col overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;