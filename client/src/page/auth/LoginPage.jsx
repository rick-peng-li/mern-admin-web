import { Alert, Button, Form, Input, Space, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

const { Paragraph, Title } = Typography;

export const LoginPage = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);

  const handleFinish = async (values) => {
    try {
      const session = await authService.login(values);
      setSession({
        token: session.token,
        user: session.user,
      });
      navigate("/", { replace: true });
    } catch (error) {
      message.error(extractErrorMessage(error));
    }
  };

  return (
    <Space direction="vertical" size={24} className="login-stack">
      <div>
        <Title level={2}>MERN Admin Web</Title>
        <Paragraph type="secondary">
          Sign in to manage admins, customers, leads, products, and dashboard
          insights from one modern workspace.
        </Paragraph>
      </div>

      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Email"
          name="email"
          initialValue="admin@demo.com"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="admin@example.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          initialValue="Admin123456!"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Log In
        </Button>
      </Form>

      <Alert
        type="info"
        showIcon
        message="Default admin account"
        description="Run the server seed script to create admin@demo.com / Admin123456!."
      />
    </Space>
  );
};
