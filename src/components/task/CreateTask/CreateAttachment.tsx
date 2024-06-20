import { Layout, Col, Row, Button, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "components";
import { Attachment, Issue } from "model";
import { motion } from "framer-motion";
import AttachmentItem from "./AttachmentItem";
import { PlusOutlined } from "@ant-design/icons";
import { ISSUE_STATUSES } from "utils/contants";

const { Content } = Layout;

const motionItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

type CreateAttachmentProps = {
  onAddAttachment: (value: boolean) => void;
  attachments?: Attachment[];
  onDelete: (attachmentId: string) => void;
  issue?: Issue | null;
};

export default function CreateAttachments(props: CreateAttachmentProps) {
  const { onAddAttachment, attachments, onDelete, issue } = props;
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <Content className="main-content edit-attachment">
        <div className="workspaces photos attachments">
          <div className="workspaces-list">
            <Row gutter={16}>
              {attachments?.map((attachment, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="full-width-col"
                  key={attachment.id}
                >
                  <motion.div
                    key={attachment.id}
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
                      attachment={attachment}
                      onDelete={onDelete}
                      isClosedStatus={issue?.IssueStatus?.code === ISSUE_STATUSES.CLOSED}
                    />
                  </motion.div>
                </Col>
              ))}
              <Col span={12}>
                <Button
                  type='dashed'
                  className='add-attachment-action'
                  onClick={() => onAddAttachment(true)}
                  disabled={issue?.IssueStatus?.code === ISSUE_STATUSES.CLOSED}
                >
                  <PlusOutlined />
                  <p>{t('Add attachment')}</p>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
    </AnimatedPage>
  );
}
