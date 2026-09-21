import { useState } from "react";

import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/PageHeader";
import { customerService } from "@/services/resourceService";

const { Paragraph, Text, Title } = Typography;

export const SelectCustomerPage = () => {
  const [search, setSearch] = useState("");

  const customerQuery = useQuery({
    queryKey: ["customer-select", search],
    queryFn: () => customerService.list({ page: 1, limit: 50, search }),
  });

  const customers = customerQuery.data?.data || [];

  return (
    <Space direction="vertical" size={24} className="page-stack">
      <PageHeader
        title="Customer Select"
        description="Browse customer profiles in a card layout for quick selection, review, and follow-up."
      />

      <Card bordered={false}>
        <Input
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search customer by company, contact, email, or phone"
          allowClear
        />
      </Card>

      <Row gutter={[16, 16]}>
        {customers.map((customer) => (
          <Col xs={24} md={12} xl={8} key={customer._id}>
            <Card
              bordered={false}
              className="customer-card"
              actions={[
                <Button type="link" href={`mailto:${customer.email}`}>
                  Email
                </Button>,
                <Button type="link" href={`tel:${customer.phone}`}>
                  Call
                </Button>,
              ]}
            >
              <Space direction="vertical" size={10} style={{ width: "100%" }}>
                <div>
                  <Title level={4}>{customer.company}</Title>
                  <Paragraph type="secondary">
                    {customer.firstName} {customer.lastName}
                  </Paragraph>
                </div>
                <Tag color={customer.status === "active" ? "green" : "default"}>
                  {customer.status}
                </Tag>
                <div className="customer-card__meta">
                  <Text type="secondary">Email</Text>
                  <Text>{customer.email}</Text>
                </div>
                <div className="customer-card__meta">
                  <Text type="secondary">Phone</Text>
                  <Text>{customer.phone}</Text>
                </div>
                <div className="customer-card__meta">
                  <Text type="secondary">Country</Text>
                  <Text>{customer.country || "--"}</Text>
                </div>
                <div className="customer-card__meta">
                  <Text type="secondary">Notes</Text>
                  <Text>{customer.notes || "--"}</Text>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};
