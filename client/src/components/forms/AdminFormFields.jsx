import { Form, Input, Select } from "antd";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const AdminFormFields = ({ mode }) => {
  return (
    <>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter admin email" }]}
      >
        <Input placeholder="admin@example.com" />
      </Form.Item>
      {mode === "create" ? (
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="At least 8 characters" />
        </Form.Item>
      ) : null}
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter last name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Avatar URL" name="avatarUrl">
        <Input placeholder="https://..." />
      </Form.Item>
      <Form.Item label="Status" name="status" initialValue="active">
        <Select options={statusOptions} />
      </Form.Item>
    </>
  );
};
