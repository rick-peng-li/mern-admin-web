import { useState } from "react";

import { Button, Form, Input, Modal, Popconfirm, Space, Tag, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PageHeader } from "@/components/common/PageHeader";
import { EntityDrawer } from "@/components/entity/EntityDrawer";
import { EntityTable } from "@/components/entity/EntityTable";
import { EntityToolbar } from "@/components/entity/EntityToolbar";
import { AdminFormFields } from "@/components/forms/AdminFormFields";
import { useEntityManagement } from "@/hooks/useEntityManagement";
import { adminService } from "@/services/resourceService";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { formatDateTime } from "@/utils/format";

export const AdminPage = () => {
  const queryClient = useQueryClient();
  const [passwordTarget, setPasswordTarget] = useState(null);
  const [passwordForm] = Form.useForm();

  const management = useEntityManagement({
    queryKey: "admins",
    service: adminService,
    createMessage: "管理员创建成功",
    updateMessage: "管理员更新成功",
    deleteMessage: "管理员删除成功",
  });

  const passwordMutation = useMutation({
    mutationFn: adminService.updatePassword,
    onSuccess: () => {
      message.success("管理员密码更新成功");
      passwordForm.resetFields();
      setPasswordTarget(null);
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error) => {
      message.error(extractErrorMessage(error));
    },
  });

  const columns = [
    {
      title: "Name",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === "active" ? "green" : "default"}>{value}</Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLoginAt",
      render: formatDateTime,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button size="small" onClick={() => management.openEdit(record)}>
            Edit
          </Button>
          <Button size="small" onClick={() => setPasswordTarget(record)}>
            Reset Password
          </Button>
          <Popconfirm
            title="Delete this admin?"
            onConfirm={() => management.deleteMutation.mutate(record.id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={24} className="page-stack">
      <PageHeader
        title="Admin Management"
        description="Manage workspace administrators, account availability, and password rotation."
      />

      <EntityToolbar
        search={management.search}
        onSearchChange={management.setSearch}
        searchPlaceholder="Search admin by email or name"
        onCreate={management.openCreate}
        createLabel="New Admin"
      />

      <EntityTable
        title="Admin Directory"
        columns={columns}
        dataSource={management.items}
        loading={management.listQuery.isLoading}
        pagination={management.pagination}
        onChange={({ page, limit }) => {
          management.setPage(page);
          management.setLimit(limit);
        }}
      />

      <EntityDrawer
        open={management.drawerOpen}
        title={management.mode === "create" ? "Create Admin" : "Edit Admin"}
        initialValues={management.currentRecord || { status: "active" }}
        loading={
          management.createMutation.isPending || management.updateMutation.isPending
        }
        onClose={management.closeDrawer}
        onSubmit={management.submit}
      >
        <AdminFormFields mode={management.mode} />
      </EntityDrawer>

      <Modal
        open={Boolean(passwordTarget)}
        title="Reset Password"
        onCancel={() => setPasswordTarget(null)}
        onOk={() => passwordForm.submit()}
        confirmLoading={passwordMutation.isPending}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={(values) =>
            passwordMutation.mutate({
              id: passwordTarget.id,
              password: values.password,
            })
          }
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password placeholder="At least 8 characters" />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};
