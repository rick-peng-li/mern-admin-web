import React from "react";
import { Col, Divider, Empty, Progress, Row, Statistic, Table, Tag } from "antd";
import { DashboardLayout } from "@/layout";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

const OverviewCard = ({ title, value, suffix, helper, color = "#22075e" }) => {
  return (
    <Col className="gutter-row" span={6}>
      <div
        className="whiteBox shadow"
        style={{ color: "#595959", fontSize: 13, minHeight: "132px" }}
      >
        <div className="pad20">
          <div style={{ color: "#8c8c8c", marginBottom: 12 }}>{title}</div>
          <div style={{ color, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
            {value}
            {suffix ? <span style={{ fontSize: 16, marginLeft: 6 }}>{suffix}</span> : null}
          </div>
          <div style={{ marginTop: 14 }}>
            <Tag color="blue">{helper}</Tag>
          </div>
        </div>
      </div>
    </Col>
  );
};

const PreviewState = ({ label, value, strokeColor }) => {
  return (
    <div style={{ color: "#595959", marginBottom: 5 }}>
      <div className="left alignLeft">{label}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          "0%": strokeColor,
          "100%": strokeColor,
        }}
      />
    </div>
  );
};

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function Dashboard() {
  const { result, isLoading, isSuccess } = useFetch(() =>
    request.get("dashboard/summary")
  );

  const overview = result?.overview || {};
  const health = result?.health || {};

  const leadColumns = [
    {
      title: "Client",
      dataIndex: "client",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = status === "pending" ? "volcano" : "green";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
    },

    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = status === "available" ? "green" : "volcano";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const renderTable = (columns, dataSource) => {
    if (!dataSource?.length) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No data yet" />;
    }

    return (
      <Table
        columns={columns}
        rowKey={(item) => item._id}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />
    );
  };

  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        <OverviewCard
          title={"Lead Budget"}
          value={formatCurrency(overview.totalBudget)}
          helper={`${overview.totalLeads || 0} total leads`}
        />
        <OverviewCard
          title={"Customers"}
          value={overview.totalCustomers || 0}
          helper={`${overview.recentCustomers || 0} added this month`}
        />
        <OverviewCard
          title={"Products"}
          value={overview.totalProducts || 0}
          helper={`${health.availableProducts || 0} available now`}
        />
        <OverviewCard
          title={"Admins"}
          value={overview.totalAdmins || 0}
          helper={"Active management accounts"}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={18}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <Row className="pad10" gutter={[0, 0]}>
              <Col className="gutter-row" span={8}>
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Lead Progress
                  </h3>
                  <PreviewState
                    label={"Pending leads"}
                    strokeColor={"#1890ff"}
                    value={overview.totalLeads ? Math.round(((health.pendingLeads || 0) / overview.totalLeads) * 100) : 0}
                  />
                  <PreviewState
                    label={"Converted leads"}
                    strokeColor={"#52c41a"}
                    value={health.leadConversionRate || 0}
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Product Availability
                  </h3>
                  <PreviewState
                    label={"Available"}
                    strokeColor={"#13c2c2"}
                    value={health.availableRate || 0}
                  />
                  <PreviewState
                    label={"Unavailable"}
                    strokeColor={"#ff4d4f"}
                    value={100 - (health.availableRate || 0)}
                  />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="pad15">
                  <h3 style={{ color: "#22075e", marginBottom: 15 }}>
                    Team Snapshot
                  </h3>
                  <Statistic
                    title="Management accounts"
                    value={overview.totalAdmins || 0}
                  />
                  <Divider />
                  <Statistic
                    title="Open leads"
                    value={health.pendingLeads || 0}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col className="gutter-row" span={6}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Customer Growth
              </h3>

              <Progress
                type="dashboard"
                percent={
                  overview.totalCustomers
                    ? Math.round(
                        ((overview.recentCustomers || 0) / overview.totalCustomers) * 100
                      )
                    : 0
                }
                width={148}
              />
              <p>New customers this month</p>
              <Divider />
              <Statistic
                title="Total customers"
                value={overview.totalCustomers || 0}
                valueStyle={{ color: "#3f8600" }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Recent Leads
              </h3>
            </div>
            {isSuccess
              ? renderTable(leadColumns, result.latestLeads)
              : renderTable(leadColumns, [])}
          </div>
        </Col>

        <Col className="gutter-row" span={12}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Recent Products
              </h3>
            </div>
            {isSuccess
              ? renderTable(productColumns, result.latestProducts)
              : renderTable(productColumns, [])}
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
