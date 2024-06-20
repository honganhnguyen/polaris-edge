import { useState } from 'react';
import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row } from 'antd';
import { Issue, User } from 'model';
import { useTranslation } from 'react-i18next';
import Comment from './Comment';
import Transfer from './Transfer';
import { ISSUE_STATUSES } from 'utils/contants';
import RejectModal from './RejectModal';

type FooterTaskProps = {
  issue?: Issue | null;
  issueId?: string | null;
  isDelete?: boolean;
  isSubmit?: boolean;
  isSubmitAsDraft?: boolean;
  isAvailableSubmit?: boolean;
  issueCode?: string | null;
  onDelete: () => void;
  onSubmit: () => void;
  onSubmitAsDraft: () => void;
  onSubmitComment: () => void;
  isAssigneeEdit?: boolean;
  isAssignerEdit?: boolean;
  onCallForReview: () => void;
  profile?: User | null;
  users: User[];
  onSubmitForm: () => void;
  onValidateForm: () => void;
  onReject: () => void;
  onFinish: () => void;
  projectId: string;
  workspaceId: string;
};

export const FooterTask = (props: FooterTaskProps) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    issue,
    issueId,
    isDelete,
    isSubmit,
    isSubmitAsDraft,
    isAvailableSubmit,
    issueCode,
    onDelete,
    onSubmit,
    onSubmitAsDraft,
    isAssigneeEdit,
    isAssignerEdit,
    onCallForReview,
    profile,
    projectId,
    workspaceId,
    users,
    onSubmitForm,
    onValidateForm,
    onReject,
    onFinish,
  } = props;
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState<boolean>(false);

  const isAssigner = profile?.id === issue?.reporterId;

  const commentHandler = () => {
    setIsFormOpen(true);
  };

  const onClickReject = () => {
    setIsOpenRejectModal(true);
  }

  const submitCommentHanler = () => {
    setIsFormOpen(false);
  };
  const transferHandler = () => {
    setIsCreateOpen(true);
  };

  const onSave = () => {
    onSubmitForm();
  }

  return issueCode !== ISSUE_STATUSES.CLOSED ? (
    <>
      {issueId ? (
        <>
          {issueCode === ISSUE_STATUSES.DRAFT ? (
            <Row gutter={16} justify='space-between' align='middle'>
              <Col span={12}>
                <Popconfirm
                  title={t('Delete the inspection')}
                  description={t('Are you sure to delete this inspection?')}
                  onConfirm={onDelete}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button
                    loading={isDelete}
                    danger
                    type='primary'
                    icon={<DeleteOutlined />}
                  >
                    {t('Delete inspection')}
                  </Button>
                </Popconfirm>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                {issue?.IssueStatus?.name === 'Draft' && (
                  <Button onClick={onSubmitAsDraft} loading={isSubmitAsDraft}>
                    {t('Save as draft')}
                  </Button>
                )}
                <Button
                  type='primary'
                  loading={isSubmit}
                  onClick={onSubmit}
                  disabled={!isAvailableSubmit}
                >
                  {t('Submit')}
                </Button>
              </Col>
            </Row>
          ) : isAssigner ? (
            issueCode === ISSUE_STATUSES.READY_FOR_INSPECTION ? (
              <Row gutter={16} justify='space-between' align='middle'>
                <Col span={12}>
                  <Popconfirm
                    title={t('Delete the inspection')}
                    description={t('Are you sure to delete this inspection?')}
                    onConfirm={onDelete}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button
                      loading={isDelete}
                      danger
                      type='primary'
                      icon={<DeleteOutlined />}
                    >
                      {t('Delete inspection')}
                    </Button>
                  </Popconfirm>
                </Col>
                {isAssignerEdit ? (
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <Button onClick={onFinish}>{t('Cancel')}</Button>
                    <Button
                      disabled={!isAvailableSubmit}
                      type='primary'
                      loading={isSubmit}
                      onClick={onSave}
                    >
                      {t('Save')}
                    </Button>
                  </Col>
                ) : (
                  <Col span={12} style={{ textAlign: 'right' }}>
                    <RejectModal
                      isOpen={isOpenRejectModal}
                      setOpen={setIsOpenRejectModal}
                      onReject={onReject}
                    />
                    <Button
                      type='dashed'
                      danger
                      loading={isSubmit}
                      onClick={onClickReject}
                    >
                      <>
                        <WarningOutlined
                          style={{ color: '#FF4D4F', marginRight: 8 }}
                        />
                        {t('Reject')}
                      </>
                    </Button>
                    <Button
                      disabled={!isAvailableSubmit}
                      type='primary'
                      loading={isSubmit}
                      onClick={onValidateForm}
                    >
                      {t('Validate')}
                    </Button>
                  </Col>
                )}
              </Row>
            ) : (
              <Row gutter={16} justify='space-between' align='middle'>
                <Col span={12}>
                  <Popconfirm
                    title={t('Delete the inspection')}
                    description={t('Are you sure to delete this inspection?')}
                    onConfirm={onDelete}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Button
                      loading={isDelete}
                      danger
                      type='primary'
                      icon={<DeleteOutlined />}
                    >
                      {t('Delete inspection')}
                    </Button>
                  </Popconfirm>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Button onClick={onFinish}>{t('Cancel')}</Button>
                  <Button
                    disabled={!isAvailableSubmit}
                    type='primary'
                    loading={isSubmit}
                    onClick={onSave}
                  >
                    {t('Save')}
                  </Button>
                </Col>
              </Row>
            )
          ) : (
            <>
              {issueCode === ISSUE_STATUSES.OPEN ? (
                <>
                  <Comment
                    isOpen={isFormOpen}
                    setOpen={setIsFormOpen}
                    issueId={issueId}
                    userCreated={profile?.id}
                    workspaceId={workspaceId}
                    projectId={projectId}
                  />
                  <Transfer
                    workspaceId={workspaceId}
                    projectId={projectId}
                    isTransferOpen={isCreateOpen}
                    setIsTransferOpen={setIsCreateOpen}
                    users={users}
                    companyId={issue?.companyId}
                    reporterId={issue?.reporterId}
                    assigneeId={issue?.assigneeId}
                    issueId={issueId}
                    onFinish={onFinish}
                  />
                  {isAssigneeEdit === true ? (
                    <Row gutter={16} justify='end' align='middle'>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <Button onClick={onFinish}>{t('Cancel')}</Button>
                        <Button type='primary' onClick={onSave}>
                          {t('Save')}
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row gutter={16} justify='space-between' align='middle'>
                      <Col span={12}>
                        <Button
                          type='dashed'
                          ghost
                          loading={isSubmit}
                          onClick={commentHandler}
                        >
                          {t('Comment')}
                        </Button>
                      </Col>
                      <Col span={12} style={{ textAlign: 'right' }}>
                        <Button loading={isSubmit} onClick={transferHandler}>
                          {t('Transfer')}
                        </Button>
                        <Button
                          type='primary'
                          loading={isSubmit}
                          onClick={onCallForReview}
                        >
                          {t('Call for review')}
                        </Button>
                      </Col>
                    </Row>
                  )}
                </>
              ) : (
                <Row gutter={16} justify='space-between' align='middle'>
                  <Col span={12}>
                    <Popconfirm
                      title={t('Delete the inspection')}
                      description={t('Are you sure to delete this inspection?')}
                      onConfirm={onDelete}
                      okText='Yes'
                      cancelText='No'
                    >
                      <Button
                        loading={isDelete}
                        danger
                        type='primary'
                        icon={<WarningOutlined />}
                      >
                        {t('Delete inspection')}
                      </Button>
                    </Popconfirm>
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      ) : (
        <Row gutter={16} justify={'end'} align='middle'>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button onClick={onSubmitAsDraft} loading={isSubmitAsDraft}>
              {t('Save as draft')}
            </Button>
            <Button
              type='primary'
              loading={isSubmit}
              onClick={onSubmit}
              disabled={!isAvailableSubmit}
            >
              {t('Submit')}
            </Button>
          </Col>
        </Row>
      )}
    </>
  ) : (
    <>
      <Row gutter={16} justify='space-between' align='middle'>
        <Col span={12}>
          <Popconfirm
            title={t('Delete the inspection')}
            description={t('Are you sure to delete this inspection?')}
            onConfirm={onDelete}
            okText='Yes'
            cancelText='No'
          >
            <Button
              loading={isDelete}
              danger
              type='primary'
              icon={<DeleteOutlined />}
            >
              {t('Delete inspection')}
            </Button>
          </Popconfirm>
        </Col>
      </Row>
    </>
  );
};
