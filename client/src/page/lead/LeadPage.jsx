import dayjs from "dayjs";
import { Button, Popconfirm, Space, Tag } from "antd";

import { PageHeader } from "@/components/common/PageHeader";
import { EntityDrawer } from "@/components/entity/EntityDrawer";
import { EntityTable } from "@/components/entity/EntityTable";
import { EntityToolbar } from "@/components/entity/EntityToolbar";
import { LeadFormFields } from "@/components/forms/LeadFormFields";
import { useEntityManagement } from "@/hooks/useEntityManagement";
import { leadService } from "@/services/resourceService";
import { formatCurrency, formatDate } from "@/utils/format";

export const LeadPage = () => {
  const management = useEntityManagement({
    queryKey: "leads",
    service: leadService,
    createMessage: "线索创建成功",
    updateMessage: "线索更新成功",
    deleteMessage: "线索删除成功",
  });

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
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
      title: "Lead Date",
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
    {
      title: "Actions",
      render: (_, record) => (
        <Space wrap>
          <Button size="small" onClick={() => management.openEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this lead?"
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

  const initialValues = management.currentRecord
    ? {
        ...management.currentRecord,
        date: management.currentRecord.date
          ? dayjs(management.currentRecord.date)
          : null,
      }
    : { status: "pending" };

  return (
    <Space direction="vertical" size={24} className="page-stack">
      <PageHeader
        title="Lead Management"
        description="Track inbound opportunities, budgets, sources, and status transitions from discovery to conversion."
      />

      <EntityToolbar
        search={management.search}
        onSearchChange={management.setSearch}
        searchPlaceholder="Search lead by customer, email, phone, source, or status"
        onCreate={management.openCreate}
        createLabel="New Lead"
      />

      <EntityTable
        title="Lead Pipeline"
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
        title={management.mode === "create" ? "Create Lead" : "Edit Lead"}
        initialValues={initialValues}
        loading={
          management.createMutation.isPending || management.updateMutation.isPending
        }
        onClose={management.closeDrawer}
        onSubmit={(values) =>
          management.submit({
            ...values,
            date: values.date?.toISOString(),
          })
        }
        width={680}
      >
        <LeadFormFields />
      </EntityDrawer>
    </Space>
  );
};
