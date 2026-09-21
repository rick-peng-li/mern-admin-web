import { Avatar, Card, Descriptions, Space, Tag, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/PageHeader";
import { authService } from "@/services/authService";
import { formatDateTime } from "@/utils/format";

const { Paragraph } = Typography;

export const SettingsPage = () => {
  const profileQuery = useQuery({
    queryKey: ["auth-profile"],
    queryFn: authService.getCurrentUser,
  });

  const profile = profileQuery.data;

  return (
    <Space direction="vertical" size={24} className="page-stack">
      <PageHeader
        title="Account Settings"
        description="Review the authenticated admin profile currently used by the workspace."
      />

      <Card bordered={false}>
        <Space size={24} align="start">
          <Avatar size={72} icon={<UserOutlined />} src={profile?.avatarUrl} />
          <div>
            <Paragraph strong style={{ fontSize: 20, marginBottom: 4 }}>
              {profile ? `${profile.firstName} ${profile.lastName}` : "Loading"}
            </Paragraph>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {profile?.email}
            </Paragraph>
          </div>
        </Space>
      </Card>

      <Card bordered={false}>
        <Descriptions column={1} title="Profile Details">
          <Descriptions.Item label="Status">
            <Tag color={profile?.status === "active" ? "green" : "default"}>
              {profile?.status || "--"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Admin ID">{profile?._id || "--"}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {formatDateTime(profile?.createdAt)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {formatDateTime(profile?.updatedAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};
