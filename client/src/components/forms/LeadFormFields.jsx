import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd";

const statusOptions = [
  { label: "New", value: "new" },
  { label: "Pending", value: "pending" },
  { label: "Qualified", value: "qualified" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
];

export const LeadFormFields = () => {
  return (
    <>
      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: "Please enter customer name" }]}
      >
        <Input />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Lead Date"
            name="date"
            rules={[{ required: true, message: "Please choose date" }]}
          >
            <DatePicker className="full-width" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: "Please enter budget" }]}
          >
            <InputNumber className="full-width" min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Source" name="source">
            <Input placeholder="Referral / Website / Event" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Status" name="status" initialValue="pending">
            <Select options={statusOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Request"
        name="request"
        rules={[{ required: true, message: "Please enter request details" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
};
