import React, { ChangeEvent, useState, useEffect } from 'react';
import {
  ClockCircleOutlined,
  CloseOutlined,
  DoubleRightOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Col, Input, Modal, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface HeaderTaskProps {
  onClose: () => void;
  visible: boolean;
  initialValue?: string;
  isCreateTaskVisible: boolean;
  onToggleContent: () => void;
  onShowDrawerContent: () => void;
}

const HeaderTaskEdit: React.FC<HeaderTaskProps> = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(t('Testing cooling system for leaks'));
  const [isEditing, setIsEditing] = useState(false);

  const [resetInput, setResetInput] = useState<boolean>(true);
  const [showInput, setShowInput] = useState<boolean>(true);

  // Unified state to control the visibility of both Details and Tabs
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Reset the value and editing state when visibility changes
    setValue(t('Testing cooling system for leaks'));
    setIsEditing(false);
  }, [props.visible]);

  const showConfirmModal = () => {
    Modal.confirm({
      width: '400px',
      title: 'Unsaved changes',
      icon: <ExclamationCircleOutlined className="icon-warning" />,
      content: 'You have unsaved changes',
      cancelText: 'Save a draft',
      okText: 'Publish',
      onOk: () => {
        props.onClose();
      },
      onCancel: () => {
        props.onClose();
      },
      className: 'custom-modal-width',
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value !== t('Testing cooling system for leaks')) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (isEditing) {
      props.onClose();
    }
  };

  const handleShowDrawerContent = () => {
    setShowContent(true);
    props.onShowDrawerContent();
  };

  const handleToggleDetails = () => {
    setShowContent((prevShowContent) => !prevShowContent);
    if (!showContent) {
      props.onShowDrawerContent();
    }
    props.onToggleContent();
  };

  // Styles for the container and input
  const containerStyle = showContent
    ? { width: '100%', height: '100%' }
    : { width: 'auto', height: 'auto' };
  const inputStyle = showContent
    ? { width: '100%', display: 'flex', alignItems: 'center' }
    : { width: 'auto', display: 'flex', alignItems: 'center' };

  return (
    <div
      className={`custom-modal ${props.visible ? 'visible' : ''} ${
        showContent ? 'small-drawer' : ''
      }`}
      style={containerStyle}
    >
      <Row justify={'space-between'} className="mb-2">
      <Col span={12} className="header">
          {showInput && (
            <>
              {showContent ? (
                <DoubleRightOutlined
                  className="icon"
                  onClick={handleToggleDetails}
                />
              ) : (
                <span className="text" onClick={handleToggleDetails}>
                  <span
                    className="circle-fill"
                    style={{
                      color: '#fff',
                      background: '#053452',
                      borderRadius: '50px',
                      marginLeft: '-8px',
                      marginTop: '-8px'
                    }}
                  >
                    {t('CV')}
                  </span>
                </span>
              )}
            </>
          )}
        </Col>
        <Col span={12} className="header text-right">
          <CloseOutlined className="icon" onClick={showConfirmModal} />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={13}>
          <div className="title-input">
            {showInput && (
              <>
                {showContent && (
                  <>
                    <span className="circle-fill">{t('CV')}</span>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Input
                        name="name"
                        status="warning"
                        placeholder={t('Testing cooling system for leaks')}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        bordered={false}
                        allowClear
                        suffix={<ClockCircleOutlined />}
                        className="width-input"
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      />
                    </Space>
                  </>
                )}
              </>
            )}
          </div>
        </Col>
        <Col span={11} className="drawing-status">
          <span className={`warningCircle ${isEditing ? 'gold' : ''}`}></span>
          <Text className="status">
            {isEditing ? t('Not started') : t('Not started')}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderTaskEdit;
