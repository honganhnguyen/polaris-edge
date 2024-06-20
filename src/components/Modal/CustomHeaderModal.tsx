import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  CloseOutlined,
  DoubleRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Col, Input, Modal, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

interface CustomHeaderModalProps {
  onClose: () => void;
  visible: boolean;
  initialValue?: string;
  isCreateTaskVisible: boolean; // Add this prop
}

const CustomHeaderModal: React.FC<CustomHeaderModalProps> = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>(props.initialValue || "");
  const [inputKey, setInputKey] = useState<number>(0);
  const [resetInput, setResetInput] = useState<boolean>(true);

  useEffect(() => {
    console.log("useEffect - props.visible:", props.visible);
    if (props.visible) {
      if (resetInput) {
        setValue("Enter task name");
        setResetInput(false);
      } else {
        setInputKey((prevKey) => prevKey + 1);
      }
    } else {
      setValue("");
      setInputKey(0);
      setResetInput(props.isCreateTaskVisible);
    }
  }, [props.visible, resetInput, props.initialValue, props.isCreateTaskVisible]);

  // Return a valid React element
  return (
    <div className="custom-modal">
      <Row justify={"space-between"} className="mb-2">
        <Col span={12} className="header">
          <DoubleRightOutlined className="icon" />
        </Col>
        <Col span={12} className="header text-right">
          <CloseOutlined className="icon" onClick={props.onClose} />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={13}>
          <div className="title-input">
            <span className="circle-fill">{t("CV")}</span>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                key={inputKey}
                name="name"
                status="warning"
                placeholder={t("Enter task name")}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                bordered={false}
                allowClear
                suffix={<ClockCircleOutlined />}
                className="width-input"
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              />
            </Space>
          </div>
        </Col>
        <Col span={11} className="drawing-status">
          <span className="warningCircle gold"></span>
          <Text className="status">{t("Not started")}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeaderModal;
