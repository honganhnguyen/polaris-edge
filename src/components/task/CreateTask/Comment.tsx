import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Col,
  Flex,
  Upload,
  Avatar,
  Typography,
  message
} from 'antd';
import React, { useState } from 'react';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  SendOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import icon from './../../assets/images/icons/google_icon.svg';
import SelectOption from 'components/common/SelectOption';
import TextArea from 'antd/es/input/TextArea';
import { issueMessageService } from 'services';
const { Title } = Typography;

interface CommentProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  issueId: string;
  projectId: string;
  workspaceId: string;
  userCreated: string | undefined;
}

const Comment: React.FC<CommentProps> = (props) => {
  const { t } = useTranslation();
  const { isOpen, setOpen, projectId, workspaceId, issueId, userCreated } =
    props;
  const [form] = Form.useForm();

  const [messageInput, setMessageInput] = useState('');

  const handleCancel = () => {
    setOpen(false);
  };

  const handleMessageChange = (event: any) => {
    setMessageInput(event.target.value);
  };

  const handleOk = async () => {
    try {
      const data: {
        issueId: string;
        userCreated: string | undefined;
        message: string;
      } = {
        issueId: issueId,
        userCreated: userCreated,
        message: messageInput,
      };
      await issueMessageService.createIssueMessage(
        workspaceId,
        projectId,
        data
      );
      setMessageInput('');
      setOpen(false);
    } catch (error) {
      setMessageInput('');
      setOpen(false);
      message.error(t('Oop! Something wrong'));
      
    }
  };

  return (
    <>
      <Modal
        title={t('Comment')}
        visible={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={675}
        className='comment-modal'
        footer={null}
      >
        <Form form={form} name='comment' layout='vertical'>
          <div className=''>
            <Form className='mb-4'>
              <Row
                gutter={16}
                justify='space-between'
                align='middle'
                className='row-comment'
              >
                <Col span={22}>
                  <TextArea
                    name='messageInput'
                    onChange={handleMessageChange}
                    placeholder={t('Leave a comment')}
                    allowClear
                    autoSize={{ minRows: 1, maxRows: 4 }}
                  />
                </Col>
                <Col span={2} style={{ textAlign: 'right' }}>
                  <Button type='primary' onClick={handleOk}>
                    {t('Send')}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Comment;
