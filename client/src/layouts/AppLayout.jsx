import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { SidebarNav } from "@/components/layout/SidebarNav";
import { TopHeader } from "@/components/layout/TopHeader";

const { Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout className="app-shell">
      <SidebarNav />
      <Layout>
        <TopHeader />
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
