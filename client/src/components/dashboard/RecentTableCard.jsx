import { Card, Table } from "antd";

export const RecentTableCard = ({ title, columns, dataSource, loading }) => {
  return (
    <Card bordered={false} title={title}>
      <Table
        rowKey={(record) => record._id || record.id}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};
