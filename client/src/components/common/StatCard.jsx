import { Card, Space, Typography } from "antd";

const { Text, Title } = Typography;

export const StatCard = ({ title, value, helper }) => {
  return (
    <Card className="stat-card" bordered={false}>
      <Space direction="vertical" size={6}>
        <Text type="secondary">{title}</Text>
        <Title level={3} style={{ margin: 0 }}>
          {value}
        </Title>
        <Text type="secondary">{helper}</Text>
      </Space>
    </Card>
  );
};
