import { Col, Progress, Row, Space, Tag, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { RecentTableCard } from "@/components/dashboard/RecentTableCard";
import { dashboardService } from "@/services/dashboardService";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
} from "@/utils/format";

const { Paragraph } = Typography;

export const DashboardPage = () => {
  const summaryQuery = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardService.getSummary,
  });

  const summary = summaryQuery.data;
  const overview = summary?.overview || {};
  const health = summary?.health || {};

  const leadColumns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: formatDate,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      render: formatCurrency,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => <Tag color={value === "won" ? "green" : "blue"}>{value}</Tag>,
    },
  ];

  const productColumns = [
    {
      title: "Product",
      dataIndex: "productName",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (value) => value || "--",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: formatCurrency,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => <Tag color={value === "available" ? "green" : "orange"}>{value}</Tag>,
    },
  ];

  return (
    <Space direction="vertical" size={24} className="page-stack">
      <PageHeader
        title="Dashboard"
        description="Track current business health, recent pipeline activity, and inventory readiness in one place."
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Lead Budget"
            value={formatCurrency(overview.totalBudget)}
            helper={`${overview.totalLeads || 0} leads in pipeline`}
          />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Customers"
            value={overview.totalCustomers || 0}
            helper={`${overview.recentCustomers || 0} added this month`}
          />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Products"
            value={overview.totalProducts || 0}
            helper={`${health.availableProducts || 0} available now`}
          />
        </Col>
        <Col xs={24} md={12} xl={6}>
          <StatCard
            title="Admins"
            value={overview.totalAdmins || 0}
            helper={`${overview.activeAdmins || 0} active accounts`}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <div className="insight-panel">
            <div className="insight-panel__item">
              <Paragraph strong>Lead conversion rate</Paragraph>
              <Progress percent={health.leadConversionRate || 0} />
            </div>
            <div className="insight-panel__item">
              <Paragraph strong>Product availability</Paragraph>
              <Progress
                percent={health.availableRate || 0}
                strokeColor="#16a34a"
              />
            </div>
            <div className="insight-panel__item">
              <Paragraph strong>Pending leads</Paragraph>
              <div className="insight-panel__value">{health.pendingLeads || 0}</div>
            </div>
            <div className="insight-panel__item">
              <Paragraph strong>Recent leads this month</Paragraph>
              <div className="insight-panel__value">{overview.recentLeads || 0}</div>
            </div>
          </div>
        </Col>
        <Col xs={24} xl={8}>
          <div className="profile-panel">
            <Paragraph strong>Workspace pulse</Paragraph>
            <Paragraph type="secondary">
              Last refresh: {formatDateTime(new Date())}
            </Paragraph>
            <div className="profile-panel__metric">
              <span>Active customers</span>
              <strong>{overview.activeCustomers || 0}</strong>
            </div>
            <div className="profile-panel__metric">
              <span>Converted leads</span>
              <strong>{health.convertedLeads || 0}</strong>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <RecentTableCard
            title="Recent Leads"
            columns={leadColumns}
            dataSource={summary?.latestLeads || []}
            loading={summaryQuery.isLoading}
          />
        </Col>
        <Col xs={24} xl={12}>
          <RecentTableCard
            title="Recent Products"
            columns={productColumns}
            dataSource={summary?.latestProducts || []}
            loading={summaryQuery.isLoading}
          />
        </Col>
      </Row>
    </Space>
  );
};
