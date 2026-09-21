import { Layout, Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { navigationItems } from "@/router/navigation";

const { Sider } = Layout;
const { Text, Title } = Typography;

export const SidebarNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      width={260}
      breakpoint="lg"
      className="app-sider"
      theme="light"
      collapsedWidth={88}
    >
      <div className="brand-block">
        <Title level={4}>MERN Admin</Title>
        <Text type="secondary">Modern management workspace</Text>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={navigationItems}
        onClick={({ key }) => navigate(key)}
        className="app-menu"
      />
    </Sider>
  );
};
