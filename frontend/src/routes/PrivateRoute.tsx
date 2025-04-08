// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { JSX } from "react";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  console.log(token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
