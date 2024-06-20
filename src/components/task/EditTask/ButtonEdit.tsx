import React from "react";
import { Button, Row, Col } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ButtonProps {
  onDraftClick: () => void;
  onPublishClick: () => void;
}

const ButtonEdit: React.FC<ButtonProps> = ({
  onDraftClick,
  onPublishClick,
}) => {
  const { t } = useTranslation();
  return (
    <Row gutter={16} justify="space-between" align="middle">
      <Col span={12}>
        <Button danger type="primary" icon={<WarningOutlined />}>
          {t("Delete task")}
        </Button>
      </Col>
      <Col span={12} style={{ textAlign: 'right'}}>
        <Button onClick={onDraftClick}>{t("Save as draft")}</Button>
        <Button type="primary" onClick={onPublishClick}>
          {t("Publish")}
        </Button>
      </Col>
    </Row>
  );
};

export default ButtonEdit;
