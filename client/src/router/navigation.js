import { createElement } from "react";

import {
  AppstoreOutlined,
  DashboardOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

export const navigationItems = [
  {
    key: "/",
    icon: createElement(DashboardOutlined),
    label: "Dashboard",
  },
  {
    key: "/customers",
    icon: createElement(UsergroupAddOutlined),
    label: "Customers",
  },
  {
    key: "/customer-select",
    icon: createElement(TeamOutlined),
    label: "Customer Select",
  },
  {
    key: "/leads",
    icon: createElement(AppstoreOutlined),
    label: "Leads",
  },
  {
    key: "/products",
    icon: createElement(ShoppingOutlined),
    label: "Products",
  },
  {
    key: "/admins",
    icon: createElement(TeamOutlined),
    label: "Admins",
  },
  {
    key: "/settings",
    icon: createElement(SettingOutlined),
    label: "Settings",
  },
];
