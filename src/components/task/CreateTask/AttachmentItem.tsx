import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import closeButton from "../../../assets/images/icons/close-circle-filled.png";
import { Attachment } from "model";
interface PhotoItemProps {
  attachment: Attachment;
  onDelete: (photoId: string) => void;
  isClosedStatus: boolean;
}

const AttachmentItem: React.FC<PhotoItemProps> = ({
  attachment,
  onDelete,
  isClosedStatus,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.35 } }}>
      <Card
        hoverable
        className={'project-card'}
        style={{ width: '100%' }}
        cover={<motion.img alt='' src={attachment.filePath} />}
      >
        <div className='project-star'>
          {!isClosedStatus && (
            <img
              src={closeButton}
              alt=''
              onClick={() => onDelete(attachment.id)}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default AttachmentItem;
