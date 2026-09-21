import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

export const GuestRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
