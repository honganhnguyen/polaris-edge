import { useState } from "react";
import { Typography, Layout, Col, Row, Button } from "antd";
import attachmentData from "mock-data/attachment-data";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "components";
import { Attachment } from "model";
import { motion } from "framer-motion";
import AttachmentItem from "./AttachmentItem";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const motionItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export default function Attachments() {
  const { t } = useTranslation();

  const [photos, setPhotos] = useState<Attachment[]>(attachmentData);

  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);

  const handleDeletePhoto = (photoId: string) => {
    if (visiblePhotos.length <= 4) {
      return;
    }

    setDeletedPhotos((prevDeletedPhotos) => [...prevDeletedPhotos, photoId]);
  };

  const visiblePhotos = photos.filter(
    (photo) => !deletedPhotos.includes(photo.id)
  );

  return (
    <AnimatedPage>
      <Content className="main-content home-page edit-attachment">
        <div className="workspaces photos attachments">
          <div className="workspaces-list">
            <Row gutter={16}>
              {visiblePhotos.map((photo, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="full-width-col"
                  key={photo.id}
                >
                  <motion.div
                    key={photo.id}
                    variants={motionItem}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: index * 0.25,
                    }}
                    style={{ marginBottom: "15px" }}
                  >
                    <AttachmentItem
                      photo={photo}
                      onDelete={handleDeletePhoto}
                      deletedPhotos={deletedPhotos}
                    />
                  </motion.div>
                </Col>
              ))}
              <Col span={12}>
              <Button type="dashed" className="create-project-action">
                <PlusOutlined />
                <p>{t("Add attachment")}</p>
              </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </AnimatedPage>
  );
}
