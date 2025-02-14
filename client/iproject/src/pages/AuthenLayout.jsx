import { Outlet, Navigate } from "react-router";
export default function AuthLayout() {
  const isAuthenticated = localStorage.access_token
  
  if(isAuthenticated) {
      return <Navigate to="/" />
}

return <Outlet />
}