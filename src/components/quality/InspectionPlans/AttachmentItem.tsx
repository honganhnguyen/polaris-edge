import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Card, MenuProps, Typography } from "antd";
import { motion } from "framer-motion";
import closeButton from "../../../assets/images/icons/close-circle-filled.png";
import { Attachment } from "model";
import { useTranslation} from "react-i18next";

const { Text } = Typography;

interface PhotoItemProps {
  photo: Attachment;
  onDelete: (photoId: string) => void;
  deletedPhotos: string[];
}

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const AttachmentItem: React.FC<PhotoItemProps> = ({
  photo,
  onDelete,
  deletedPhotos,
}) => {
  const { t } = useTranslation();
  if (deletedPhotos.includes(photo.id)) {
    return null;
  }

  const handleDelete = () => {
    onDelete(photo.id);
  };

  const items: MenuProps["items"] = [
    {
      label: t('Delete image'),
      key: "1",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(),
    },
  ];

  const menuProps: MenuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.35 } }}>
      <Card
        hoverable
        className={`project-card ${
          deletedPhotos.includes(photo.id) ? "hidden" : ""
        }`}
        style={{ width: "100%" }}
        cover={<motion.img alt="" src={photo.picture} />}
      >
        <div className="project-star">
          <img src={closeButton} alt="" onClick={handleDelete} />
        </div>
      </Card>
    </motion.div>
  );
};

export default AttachmentItem;
