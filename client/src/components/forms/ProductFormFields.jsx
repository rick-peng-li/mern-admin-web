import { Col, Form, Input, InputNumber, Row, Select } from "antd";

const statusOptions = [
  { label: "Available", value: "available" },
  { label: "Low stock", value: "low-stock" },
  { label: "Archived", value: "archived" },
];

export const ProductFormFields = () => {
  return (
    <>
      <Form.Item
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: "Please enter product name" }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="SKU" name="sku">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Status" name="status" initialValue="available">
            <Select options={statusOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter product description" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter product price" }]}
      >
        <InputNumber className="full-width" min={0} />
      </Form.Item>
    </>
  );
};
