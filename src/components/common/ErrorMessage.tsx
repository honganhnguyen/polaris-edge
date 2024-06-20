import { CloseCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
const { Text } = Typography;

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <Text className="error-message">
      <CloseCircleFilled />
      {message}
    </Text>
  );
}
