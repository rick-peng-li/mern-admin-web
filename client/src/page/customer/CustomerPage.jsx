import { Button, Popconfirm, Space, Tag } from "antd";

import { PageHeader } from "@/components/common/PageHeader";
import { EntityDrawer } from "@/components/entity/EntityDrawer";
import { EntityTable } from "@/components/entity/EntityTable";
import { EntityToolbar } from "@/components/entity/EntityToolbar";
import { CustomerFormFields } from "@/components/forms/CustomerFormFields";
import { useEntityManagement } from "@/hooks/useEntityManagement";
import { customerService } from "@/services/resourceService";
import { formatDateTime } from "@/utils/format";

export const CustomerPage = () => {
  const management = useEntityManagement({
    queryKey: "customers",
    service: customerService,
    createMessage: "客户创建成功",
    updateMessage: "客户更新成功",
    deleteMessage: "客户删除成功",
  });

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Contact",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color={value === "active" ? "green" : "default"}>{value}</Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: formatDateTime,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button size="small" onClick={() => management.openEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this customer?"
            onConfirm={() => management.deleteMutation.mutate(record._id)}
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
        title="Customer Management"
        description="Maintain company profiles, contacts, billing references, and activity notes in a structured directory."
      />

      <EntityToolbar
        search={management.search}
        onSearchChange={management.setSearch}
        searchPlaceholder="Search customer by company, contact, email, or phone"
        onCreate={management.openCreate}
        createLabel="New Customer"
      />

      <EntityTable
        title="Customer Directory"
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
        title={
          management.mode === "create" ? "Create Customer" : "Edit Customer"
        }
        initialValues={management.currentRecord || { status: "active" }}
        loading={
          management.createMutation.isPending || management.updateMutation.isPending
        }
        onClose={management.closeDrawer}
        onSubmit={management.submit}
        width={700}
      >
        <CustomerFormFields />
      </EntityDrawer>
    </Space>
  );
};
