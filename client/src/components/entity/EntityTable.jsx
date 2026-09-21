import { Card, Table } from "antd";

export const EntityTable = ({
  title,
  columns,
  dataSource,
  loading,
  pagination,
  onChange,
}) => {
  return (
    <Card bordered={false} title={title}>
      <Table
        rowKey={(record) => record._id || record.id}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={(tablePagination) =>
          onChange({
            page: tablePagination.current,
            limit: tablePagination.pageSize,
          })
        }
      />
    </Card>
  );
};
