import { Space, Typography } from "antd";

const { Paragraph, Title } = Typography;

export const PageHeader = ({ title, description, extra }) => {
  return (
    <div className="page-header">
      <div>
        <Title level={2}>{title}</Title>
        <Paragraph type="secondary" className="page-header__description">
          {description}
        </Paragraph>
      </div>
      {extra ? <Space>{extra}</Space> : null}
    </div>
  );
};
