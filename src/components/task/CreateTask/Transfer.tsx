import React, { useState, useEffect, useMemo } from 'react';
import { Button, Form, Modal, Select, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { User } from 'model';
import { issueService } from 'services';

const Option = Select.Option;
const { Title } = Typography;

interface TransferProps {
  isTransferOpen: boolean;
  setIsTransferOpen: (value: boolean) => void;
  projectId?: string | null | undefined;
  workspaceId?: string | null | undefined;
  companyId: string | undefined;
  users: User[];
  refreshIssues?: () => void;
  loading?: boolean;
  issueCode?: string | null;
  reporterId: string | undefined;
  assigneeId: string | undefined;
  issueId: string;
  onFinish: () => void;
}

const Transfer: React.FC<TransferProps> = (props) => {
  const { t } = useTranslation();
  const {
    isTransferOpen,
    setIsTransferOpen,
    projectId,
    workspaceId,
    issueCode,
    users,
    companyId,
    reporterId,
    assigneeId,
    issueId,
    onFinish,
  } = props;
  const [form] = Form.useForm();
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>('');

  const options = useMemo(() => {
    return users.filter(
      (user) => user.WorkspaceUser?.Company?.id === companyId
    );
  }, [companyId]);

  const [inputValue, setInputValue] = useState<string>('');

  const handleCancel = () => {
    setIsTransferOpen(false);
  };

  const onSubmitTransfer = async () => {
    try {
      const data: {assigneeId: string, isSaveAsDraft: boolean} = {
        assigneeId: selectedAssigneeId,
        isSaveAsDraft: true
      }
      if(workspaceId && projectId && issueId) {
        await issueService.updateIssue(workspaceId, projectId, issueId, data);
      }
      setInputValue('');
      setIsTransferOpen(false);
      onFinish();
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (value: string) => {
    setSelectedAssigneeId(value);
    console.log(value);
    setInputValue('');
  };

  return (
    <>
      <Modal
        title={t('Transfer inspection')}
        visible={isTransferOpen}
        onCancel={handleCancel}
        width={675}
        className='comment-modal'
        footer={[
          <>
            <Button onClick={handleCancel}>{t('Cancel')}</Button>
            <Button type='primary' onClick={onSubmitTransfer}>
              {t('Transfer')}
            </Button>
          </>,
        ]}
      >
        <Form form={form} name='comment' layout='vertical'>
          <div className=''>
            <Form className='mb-4'>
              <Select
                className='w-100'
                allowClear
                showSearch
                optionFilterProp='children'
                placeholder={t('Enter user name')}
                onChange={handleChange}
                filterOption={false}
                onSearch={(e) => {
                  setInputValue(e);
                }}
                optionLabelProp='label'
              >
                {options
                  ?.filter(
                    (user: User) =>
                      (!inputValue ||
                        user?.fullName
                          ?.toString()
                          .toLowerCase()
                          .includes(inputValue) ||
                        user?.fullName
                          ?.toString()
                          .toLowerCase()
                          .includes(inputValue)) &&
                      user.id !== reporterId &&
                      user.id !== assigneeId
                  )
                  .map((user) => (
                    <Option key={user.id} value={user.id} label={user.fullName}>
                      <div className='custom-select-input-user'>
                        <div className='text-circle'>
                          {user.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div className='ml-2'>
                          <div className='ttl'>{user.fullName}</div>
                          <div className='desc'>
                            {user.WorkspaceUser?.Company?.name}
                          </div>
                        </div>
                      </div>
                    </Option>
                  ))}
              </Select>
            </Form>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Transfer;
