import React, { ChangeEvent, useState, useEffect } from 'react';
import {
  CaretDownFilled,
  CaretDownOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DoubleRightOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Col, Input, MenuProps, Row, Select, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Dropdown from 'antd/es/dropdown/dropdown';

const { Text } = Typography;

interface HeaderEditInspectionPlanProps {
  onClose: () => void;
  visible: boolean;
  initialValue?: string;
  isCreateTaskVisible: boolean;
  onToggleContent: () => void;
  onShowDrawerContent: () => void;
}

const HeaderEditInspectionPlan: React.FC<HeaderEditInspectionPlanProps> = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(t('Enter inspection name'));
  const [isEditing, setIsEditing] = useState(false);

  const [resetInput, setResetInput] = useState<boolean>(true);
  const [showInput, setShowInput] = useState<boolean>(true);

  // Unified state to control the visibility of both Details and Tabs
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Reset the value and editing state when visibility changes
    setValue(t('Enter inspection name'));
    setIsEditing(false);
  }, [props.visible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value !== t('Enter inspection name')) {
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

  const onClose = () => {
    props.onClose();
  }

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

  const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
  };    

  const items: MenuProps['items'] = [
    {
      label: 'Draft',
      key: '1',
    },
  ]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const renderLabel = (label: string, color: string) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        className='circle-fill'
        style={{
          display: 'inline-block',
          width: '12px', // Adjust the width as needed
          height: '12px', // Adjust the height as needed
          borderRadius: '50%',
          backgroundColor: color,
          marginRight: '4px', // Adjust the margin as needed
          minWidth: '12px',
        }}
      />
      {label}
    </div>
  );

  const options = [
    {
      value: 'draft',
      label: renderLabel(t('Draft'), 'rgba(0, 0, 0, 0.45)'),
    },
    {
      value: 'open-yellow',
      label: renderLabel(t('Open'), '#FFD591'),
    },
    {
      value: 'open-red',
      label: renderLabel(t('Open'), '#FFA39E'),
    },
    {
      value: 'ready-for-inspection-blue',
      label: renderLabel(t('Ready for inspection'), '#91CAFF'),
    },
    {
      value: 'ready-for-inspection-purple',
      label: renderLabel(t('Ready for inspection'), '#D3ADF7'),
    },
    {
      value: 'close',
      label: renderLabel(t('Close'), '#52C41A'),
    },
  ];

  return (
    <div
      className={`custom-modal ${props.visible ? 'visible' : ''} ${
        showContent ? 'small-drawer' : ''
      }`}
      style={containerStyle}
    >
      <Row justify={'space-between'} className="mb-4">
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
                    className=""
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
          <CloseOutlined className="icon" onClick={onClose} />
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={16}>
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
                        placeholder={t('Enter inspection name')}
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        bordered={false}
                        allowClear
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
        <Col span={8} className="drawing-status">
        <Space wrap>
          <Select
            labelInValue
            suffixIcon={<CaretDownOutlined />}
            dropdownMatchSelectWidth={false}
            defaultValue={{
              value: 'draft',
              label: renderLabel(t('Draft'), 'rgba(0, 0, 0, 0.45)'),
            }}
            options={options}
          />
        </Space>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderEditInspectionPlan;
