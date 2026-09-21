import React from "react";
import { Button, Descriptions, Empty, Tag } from "antd";
import { Link } from "react-router-dom";

import { DashboardLayout } from "@/layout";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

export default function Settings() {
  const { result, isLoading, isSuccess } = useFetch(() =>
    request.get("admin/profile")
  );

  return (
    <DashboardLayout>
      <div className="whiteBox shadow pad20">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h2 style={{ marginBottom: 8 }}>Account Settings</h2>
            <p style={{ marginBottom: 0, color: "#8c8c8c" }}>
              Review the current authenticated admin profile.
            </p>
          </div>
          <Button type="primary">
            <Link to="/logout">Log out</Link>
          </Button>
        </div>

        {isSuccess ? (
          <Descriptions bordered column={1} loading={isLoading}>
            <Descriptions.Item label="Email">{result.email}</Descriptions.Item>
            <Descriptions.Item label="Name">{result.name}</Descriptions.Item>
            <Descriptions.Item label="Surname">
              {result.surname}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={result.enabled ? "green" : "red"}>
                {result.enabled ? "Enabled" : "Disabled"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Admin ID">{result._id}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Profile data is not available"
          />
        )}
      </div>
    </DashboardLayout>
  );
}
