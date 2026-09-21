import { Button, Popconfirm, Space, Tag } from "antd";

import { PageHeader } from "@/components/common/PageHeader";
import { EntityDrawer } from "@/components/entity/EntityDrawer";
import { EntityTable } from "@/components/entity/EntityTable";
import { EntityToolbar } from "@/components/entity/EntityToolbar";
import { ProductFormFields } from "@/components/forms/ProductFormFields";
import { useEntityManagement } from "@/hooks/useEntityManagement";
import { productService } from "@/services/resourceService";
import { formatCurrency, formatDateTime } from "@/utils/format";

export const ProductPage = () => {
  const management = useEntityManagement({
    queryKey: "products",
    service: productService,
    createMessage: "产品创建成功",
    updateMessage: "产品更新成功",
    deleteMessage: "产品删除成功",
  });

  const columns = [
    {
      title: "Product Name",
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
      render: (value) => (
        <Tag color={value === "available" ? "green" : "orange"}>{value}</Tag>
      ),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
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
            title="Delete this product?"
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
        title="Product Management"
        description="Manage product catalog content, stock status, pricing, and SKU references in a modern data table."
      />

      <EntityToolbar
        search={management.search}
        onSearchChange={management.setSearch}
        searchPlaceholder="Search product by name, SKU, description, or status"
        onCreate={management.openCreate}
        createLabel="New Product"
      />

      <EntityTable
        title="Product Catalog"
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
          management.mode === "create" ? "Create Product" : "Edit Product"
        }
        initialValues={management.currentRecord || { status: "available" }}
        loading={
          management.createMutation.isPending || management.updateMutation.isPending
        }
        onClose={management.closeDrawer}
        onSubmit={management.submit}
      >
        <ProductFormFields />
      </EntityDrawer>
    </Space>
  );
};
