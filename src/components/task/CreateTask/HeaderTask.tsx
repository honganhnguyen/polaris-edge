import React, { useMemo } from 'react';
import { CloseOutlined, DoubleRightOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Form,
  FormInstance,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store';
import { selectIssueStatuses } from 'store/common.slice';
import { Issue, IssueDiscipline, User } from 'model';
import { ISSUE_STATUSES, TASK_STATUS_HEADER_COLOR } from 'utils/contants';
import { color } from 'framer-motion';

type HeaderTaskProps = {
  onClose: () => void;
  visible: boolean;
  formInstance: FormInstance;
  initialHeaderValue?: string;
  isCreateTaskVisible: boolean;
  onToggleContent: () => void;
  onShowDrawerContent: () => void;
  descipline?: IssueDiscipline | null;
  isUnSaveStatus?: boolean;
  selectedIssue: Issue | null;
  inspectionName?: string;
  users: User[];
};


const HeaderTask: React.FC<HeaderTaskProps> = (props) => {
  const {
    formInstance,
    visible,
    descipline,
    isUnSaveStatus,
    selectedIssue,
    inspectionName,
    users,
  } = props;
  const { t } = useTranslation();
  const issueStatuses = useAppSelector(selectIssueStatuses);
  const assignerName = users.find(user => user.id === selectedIssue?.reporterId)?.fullName;

  const handleToggleDetails = () => {
    props.onToggleContent();
  };

  const renderLabel = (label: string, color?: string) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tag className='circle-fill small' color={color ?? ''} bordered={false} />
      {t(label)}
    </div>
  );

  const statusOptions = useMemo(() => {
    return issueStatuses?.map((status) => ({
      value: status.id,
      label: renderLabel(status.name, status.color),
    }));
  }, [issueStatuses]);

  const renderStatusHeader = () => {
    if (!selectedIssue) {
      return null;
    }
    const { IssueStatus } = selectedIssue;
    if (!IssueStatus) {
      return null;
    }
    const { name, code } = IssueStatus;

    const isReadyForInspection: boolean =
      code === ISSUE_STATUSES.READY_FOR_INSPECTION;
    const isOpen: boolean = code === ISSUE_STATUSES.OPEN;
    const isExpired: boolean =
      new Date(selectedIssue?.plannedEndDate) < new Date() &&
      selectedIssue?.plannedEndDate;

    return (
      <>
        {isReadyForInspection && isExpired ? (
          <Tag>
            {renderLabel(
              name,
              TASK_STATUS_HEADER_COLOR[
                ISSUE_STATUSES.READY_FOR_INSPECTION_OVERDUE
              ]
            )}
          </Tag>
        ) : isOpen && isExpired ? (
          <Tag>
            {renderLabel(
              name,
              TASK_STATUS_HEADER_COLOR[ISSUE_STATUSES.OPEN_OVERDUE]
            )}
          </Tag>
        ) : (
          <Tag>{renderLabel(name, TASK_STATUS_HEADER_COLOR[code])}</Tag>
        )}
      </>
    );
  };

  // Return a valid React element
  return (
    <div
      className={`custom-modal small-drawer`}
      style={{ width: '100%', height: '100%' }}
    >
      <Row justify='space-between' className='mb-2'>
        <Col span={12} className='header'>
          <DoubleRightOutlined className='icon' onClick={handleToggleDetails} />
        </Col>
        <Col span={12} className='header text-right'>
          <CloseOutlined className='icon' onClick={props.onClose} />
        </Col>
      </Row>
      <Row justify='space-between' className='create-inspection-header'>
        <Col>
          <div className='title-input'>
            <span className='avatar'>
              <Avatar className='my-3 avt-color'>
                {descipline?.code?.toString().toUpperCase() || '-'}
              </Avatar>
            </span>
            <Space direction='vertical' style={{ width: '100%', rowGap: 0 }}>
              <div className='title'>{inspectionName}</div>
              <div>
                <Typography.Text
                  type='secondary'
                  style={{ paddingLeft: '12px' }}
                >
                  {assignerName}
                </Typography.Text>
              </div>
            </Space>
          </div>
        </Col>
        {/* Omitted the rest for brevity */}
        <Space wrap>
          <Form.Item name={'issueStatusId'} className='mb-0'>
            {isUnSaveStatus ? (
              <Tag>{t('Unsaved')}</Tag>
            ) : (
              <> {renderStatusHeader()}</>
            )}
          </Form.Item>
        </Space>
      </Row>
    </div>
  );
};

export default HeaderTask;
