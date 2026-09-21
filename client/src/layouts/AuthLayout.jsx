import { Card, Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const AuthLayout = () => {
  return (
    <Layout className="auth-shell">
      <Content className="auth-shell__content">
        <Card className="auth-card" bordered={false}>
          <Outlet />
        </Card>
      </Content>
    </Layout>
  );
};
