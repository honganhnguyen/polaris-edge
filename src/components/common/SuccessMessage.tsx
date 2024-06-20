import { CheckCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
const { Text } = Typography;

export default function SuccessMessage({ message }: { message: string }) {
  return (
    <Text className="success-message">
      <CheckCircleFilled />
      {message}
    </Text>
  );
}
