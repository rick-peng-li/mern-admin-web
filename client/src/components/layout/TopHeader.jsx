import { Avatar, Button, Dropdown, Layout, Space, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const { Header } = Layout;
const { Text } = Typography;

export const TopHeader = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
      navigate("/login", { replace: true });
    }
  };

  const dropdownItems = [
    {
      key: "settings",
      label: "Account Settings",
      onClick: () => navigate("/settings"),
    },
    {
      key: "logout",
      label: "Log out",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Header className="app-header">
      <Space size={12}>
        <div className="header-badge">Unified workspace</div>
      </Space>
      <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
        <Button type="text" className="header-user">
          <Space size={12}>
            <Avatar icon={<UserOutlined />} />
            <div className="header-user__meta">
              <Text strong>
                {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
              </Text>
              <Text type="secondary">{user?.email}</Text>
            </div>
          </Space>
        </Button>
      </Dropdown>
    </Header>
  );
};
