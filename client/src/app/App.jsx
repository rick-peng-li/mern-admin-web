import { useEffect } from "react";

import { RouterProvider } from "react-router-dom";

import { AppProviders } from "@/app/providers";
import { router } from "@/router";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const SessionBootstrap = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    if (!token || user) {
      return;
    }

    authService
      .getCurrentUser()
      .then((data) => {
        setSession({
          token,
          user: {
            id: data.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            status: data.status,
            avatarUrl: data.avatarUrl,
          },
        });
      })
      .catch(() => {
        clearSession();
      });
  }, [token, user, setSession, clearSession]);

  return children;
};

export default function App() {
  return (
    <AppProviders>
      <SessionBootstrap>
        <RouterProvider router={router} />
      </SessionBootstrap>
    </AppProviders>
  );
}
