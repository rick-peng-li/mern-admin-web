import { useEffect } from "react";

import { Button, Drawer, Form, Space } from "antd";

export const EntityDrawer = ({
  open,
  title,
  initialValues,
  loading,
  onClose,
  onSubmit,
  children,
  width = 520,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();

    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues, open]);

  return (
    <Drawer
      open={open}
      title={title}
      width={width}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={() => form.submit()}>
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {children}
      </Form>
    </Drawer>
  );
};
