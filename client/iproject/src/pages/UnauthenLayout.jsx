import { Outlet, Navigate } from "react-router";

export default function UnauthLayout() {
  const isAuthenticated = localStorage.access_token;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
