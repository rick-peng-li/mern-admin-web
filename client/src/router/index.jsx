import { createBrowserRouter } from "react-router-dom";

import { GuestRoute } from "@/router/GuestRoute";
import { ProtectedRoute } from "@/router/ProtectedRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminPage } from "@/page/admin/AdminPage";
import { LoginPage } from "@/page/auth/LoginPage";
import { CustomerPage } from "@/page/customer/CustomerPage";
import { DashboardPage } from "@/page/dashboard/DashboardPage";
import { LeadPage } from "@/page/lead/LeadPage";
import { ProductPage } from "@/page/product/ProductPage";
import { SelectCustomerPage } from "@/page/select-customer/SelectCustomerPage";
import { SettingsPage } from "@/page/settings/SettingsPage";
import { NotFoundPage } from "@/page/shared/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/admins",
            element: <AdminPage />,
          },
          {
            path: "/customers",
            element: <CustomerPage />,
          },
          {
            path: "/customer-select",
            element: <SelectCustomerPage />,
          },
          {
            path: "/leads",
            element: <LeadPage />,
          },
          {
            path: "/products",
            element: <ProductPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
