import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  message,
  Typography
} from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';
import { ExclamationCircleFilled, WarningOutlined } from '@ant-design/icons';
const { Text } = Typography;

interface RejectProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onReject: () => void;
}

const RejectModal: React.FC<RejectProps> = (props) => {
  const { t } = useTranslation();
  const { isOpen, setOpen, onReject } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
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
      setIsSubmit(true);
      setMessageInput('');
      await onReject();
      setIsSubmit(false);
      setOpen(false);
    } catch (error) {
      setMessageInput('');
      setIsSubmit(false);
      setOpen(false);
      message.error(t('Oop! Something wrong'));
    }
  };

  return (
    <>
      <Modal
        title={
          <>
            <ExclamationCircleFilled
              style={{ color: '#FAAD14', marginRight: 8 }}
            />
            {t('Reject')}
          </>
        }
        visible={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={400}
        footer={
          <>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type='primary' onClick={handleOk}>
                {t('Cancel')}
              </Button>
              <Button
                type='dashed'
                onClick={handleOk}
                danger
                loading={isSubmit}
              >
                {
                  <>
                    <WarningOutlined
                      style={{ color: '#FF4D4F', marginRight: 8 }}
                    />
                    {t('Reject')}
                  </>
                }
              </Button>
            </Col>
          </>
        }
      >
        <Form form={form} name='comment' layout='vertical'>
          <Form className='mb-5'>
            <Row
              gutter={16}
              justify='space-between'
              align='middle'
              className='row-comment'
            >
              <Col span={24} style={{ marginBottom: '16px' }}>
                <Text>
                  A notification will be sent to John Doe to inform him and the
                  inspection will be reset to open
                </Text>
              </Col>
              <Col span={24}>
                <Form.Item name='comment' label={t('Add a comment:')}>
                  <TextArea
                    onChange={handleMessageChange}
                    placeholder={t('Leave a comment')}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Form>
      </Modal>
    </>
  );
};

export default RejectModal;
