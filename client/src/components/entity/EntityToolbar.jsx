import { Button, Card, Input, Space } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export const EntityToolbar = ({
  search,
  onSearchChange,
  searchPlaceholder,
  onCreate,
  createLabel,
}) => {
  return (
    <Card bordered={false}>
      <div className="entity-toolbar">
        <Input
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          allowClear
          className="entity-toolbar__search"
        />
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
            {createLabel}
          </Button>
        </Space>
      </div>
    </Card>
  );
};
