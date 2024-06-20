import { SetStateAction, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CommentOutlined, LinkOutlined, TagOutlined } from '@ant-design/icons';
import {
  Form,
  Drawer,
  Flex,
  Button,
  Tabs,
  TabsProps,
  message,
  Spin,
} from 'antd';
import HeaderTask from './HeaderTask';
import { useAppSelector } from 'store';
import { attachmentService, issueService } from 'services';
import {
  ATTACHMENT_TYPES,
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
} from 'utils/contants';
import { selectMyWorkspace } from 'store/my-workspace.slice';
import { ModalState } from 'types';
import {
  CreateTaskDetail,
  CreateAttachment,
  CreateComment,
} from 'components/task';
import {
  useAttachmentTypes,
  useAttachmentTypesParams,
  useIssueDisciplines,
  useIssueDisciplinesParams,
  useIssuePriorities,
  useIssuePrioritiesParams,
  useIssueStatuses,
  useIssueStatusesParams,
  useIssueTypes,
  useIssueTypesParams,
  useProjectCompanies,
  useProjectCompaniesParams,
  useProjectUsers,
  useProjectUsersParams,
  useProjectZones,
  useProjectZonesParams,
  useProjectPhasesParams,
  useProjectPhases,
} from 'hooks';
import UploadPhotoModal from './UploadModal';
import { Attachment, Issue, IssueDiscipline } from 'model';
import { FooterTask } from './FooterTask';
import { PinInspection } from 'components/inspection';
import IssueAttachment from 'model/IssueAttachment';
import { MiniPlan } from 'components/common';
import { AsyncLocalStorage } from 'async_hooks';
import useAuthContext from 'store/auth-context';

type CreateTaskProps = {
  isOpen: boolean;
  onFinish: () => void;
  setOpen: (value: boolean) => void;
  setCreateCollapse: (value: boolean) => void;
  issueId: string | null;
  refreshIssues: () => void;
  module: string;
  workspaceId: string;
};
export type WorkspaceViewType = 'detail' | 'attachments' | 'comments';

export default function CreateTask(props: CreateTaskProps) {
  const {
    isOpen,
    setOpen,
    onFinish,
    issueId,
    setCreateCollapse,
    refreshIssues,
    module,
    workspaceId,
  } = props;
  const { profile } = useAuthContext();
  const params = useParams();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const projectId = params.projectId as string;
  // const myWorkspace = useAppSelector(selectMyWorkspace);
  // const workspaceId = myWorkspace?.id as string;

  const [issueStatusesQuery] = useIssueStatusesParams({
    orderBy: 'orderNumber',
  });
  const [issueStatuses] = useIssueStatuses(issueStatusesQuery);
  const [issueTypesQuery] = useIssueTypesParams({ module });
  const [issueTypes] = useIssueTypes(issueTypesQuery);
  const [issueDisciplinesQuery] = useIssueDisciplinesParams();
  const [issueDisciplines] = useIssueDisciplines(issueDisciplinesQuery);
  const [issuePrioritiesQuery] = useIssuePrioritiesParams({
    orderBy: 'orderNumber',
  });
  const [issuePriorities] = useIssuePriorities(issuePrioritiesQuery);
  const [attachmentTypeQuery] = useAttachmentTypesParams();
  const [attachmentTypes] = useAttachmentTypes(attachmentTypeQuery);
  const [companiesParams] = useProjectCompaniesParams({
    projectId,
    workspaceId,
  });
  const [companies] = useProjectCompanies(companiesParams);
  const [usersParams] = useProjectUsersParams({ projectId, workspaceId });
  const [users] = useProjectUsers(usersParams);
  const [zonesParams] = useProjectZonesParams({
    projectId,
    workspaceId,
    orderBy: 'name',
  });
  const [zones] = useProjectZones(zonesParams);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmitAsDraft, setIsSubmitAsDraft] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingAttachment, setIsLoadingAttachment] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isOpenPin, setIsOpenPin] = useState<ModalState | number>(null);
  const [isOpenUpload, setIsOpenUpload] = useState<ModalState>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<IssueDiscipline | null>(null);
  const [activeTab, setActiveTab] = useState<WorkspaceViewType>('detail');
  const [plan, setPlan] = useState<IssueAttachment | null>(null);
  const [planImage, setPlanImage] = useState<Attachment | null>(null);

  const [showContent, setShowContent] = useState(true);
  const [isAvailableSubmit, setIsAvailableSubmit] = useState(false);
  const [phasesParams] = useProjectPhasesParams({ workspaceId, projectId });
  const [phases] = useProjectPhases(phasesParams);
  const defaultName = useMemo(
    () =>
      `${t('Inspection')} - ${dayjs().format('YYYY-MM-DD HH:MM').toString()}`,
    [isOpen]
  );
  const [inspectionName, setInspectionName] = useState(defaultName);
  const [isAssigneeEdit, setIsAssigneeEdit] = useState(false);
  const [isAssignerEdit, setIsAssignerEdit] = useState(false);

  const inpectionPhotoType = useMemo(() => {
    return attachmentTypes?.find(
      (i) => i.code === ATTACHMENT_TYPES.INSPECTION_PHOTO
    );
  }, [attachmentTypes]);

  const getIssue = async (issueId: string) => {
    try {
      setIsLoading(true);
      const issueData = await issueService.getIssueById(
        workspaceId,
        projectId,
        issueId,
        { include: 'IssueWatchers|Plans|IssueStatus' }
      );
      setSelectedIssue(issueData);
      if (issueData.plannedStartDate) {
        issueData.plannedStartDate = dayjs(issueData.plannedStartDate);
      }
      if (issueData.plannedEndDate) {
        issueData.plannedEndDate = dayjs(issueData.plannedEndDate);
      }
      if (issueData.effectiveStartDate) {
        issueData.effectiveStartDate = dayjs(issueData.effectiveStartDate);
      }
      if (issueData.effectiveEndDate) {
        issueData.effectiveEndDate = dayjs(issueData.effectiveEndDate);
      }
      form.setFieldsValue(issueData);
      if (issueData?.Plans?.length) {
        setPlanImage(issueData.Plans[0]);
        setPlan(issueData?.Plans[0].IssueAttachment || null);
      } else {
        setPlanImage(null);
        setPlan(null);
      }
      setInspectionName(issueData.name);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error(t((error as Error).message));
    }
  };

  useEffect(() => {
    if (issueId && isOpen) {
      getIssue(issueId);
      setIsAssigneeEdit(false);
      setIsAssignerEdit(false);
    } else {
      form.setFieldValue('plannedStartDate', dayjs());
      form.setFieldValue('name', defaultName);
      setInspectionName(defaultName);
    }
  }, [issueId, isOpen]);

  useEffect(() => {
    if (selectedIssue) {
      const issueDiscipline = issueDisciplines?.find(
        (d) => d.id === selectedIssue?.issueDisciplineId
      );
      setSelectedDiscipline(issueDiscipline || null);
    }
  }, [selectedIssue, issueDisciplines]);

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setAttachments([]);
      setPlan(null);
      setSelectedDiscipline(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (issueStatuses?.length && !issueId && isOpen) {
      form.setFieldValue(
        'issueStatusId',
        issueStatuses.find((status) => status.code === ISSUE_STATUSES.DRAFT)?.id
      );
    }
  }, [issueStatuses, issueId, isOpen]);

  useEffect(() => {
    if (issuePriorities?.length && !issueId && isOpen) {
      form.setFieldValue(
        'issuePriorityId',
        issuePriorities?.find((item) => item.code === ISSUE_PRIORITIES.MEDIUM)
          ?.id
      );
    }
  }, [issuePriorities, issueId, isOpen]);

  useEffect(() => {
    if (zones?.length && !issueId && isOpen) {
      form.setFieldValue(
        'zoneId',
        zones?.find((zone) => zone.parentId === null)?.id || zones[0].id
      );
    }
  }, [zones, issueId, isOpen]);

  useEffect(() => {
    if (issueTypes?.length && !issueId && isOpen) {
      form.setFieldValue('issueTypeId', issueTypes[0].id);
    }
  }, [issueTypes, issueId, isOpen]);
  
  const convertSubmitData = (values: any, isSaveAsDraft: boolean = false) => {
    if (isSaveAsDraft) {
      Object.keys(values).forEach((key) => {
        if (values[key] === null) {
          values[key] = undefined;
        }
      });
    }
    if (!values.name) {
      values.name = defaultName;
    }
    if (values.plannedStartDate) {
      values.plannedStartDate = dayjs(values.plannedStartDate).format(
        'YYYY-MM-DD'
      );
    }
    if (values.plannedEndDate) {
      values.plannedEndDate = dayjs(values.plannedEndDate).format('YYYY-MM-DD');
    }
    if (values.effectiveStartDate) {
      values.effectiveStartDate = dayjs(values.effectiveStartDate).format(
        'YYYY-MM-DD'
      );
    }
    if (values.effectiveEndDate) {
      values.effectiveEndDate = dayjs(values.effectiveEndDate).format(
        'YYYY-MM-DD'
      );
    }
    values.plan = plan;
  };

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      try {
        values.isSaveAsDraft = false;
        convertSubmitData(values);
        setIsSubmit(true);
        values.issueStatusId = issueStatuses?.find((status) => status.code === ISSUE_STATUSES.OPEN)?.id;
        if (issueId) {
          await issueService.updateIssue(
            workspaceId,
            projectId,
            issueId,
            values
          );
        } else {
          await issueService.createIssue(workspaceId, projectId, values);
        }
        refreshIssues();
        setIsSubmit(false);
        onFinish();
        form.resetFields();
      } catch (error) {
        setIsSubmit(false);
        message.error(t('Oop! Something wrong'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitAsDraft = async () => {
    try {
      const values = await form.getFieldsValue();
      try {
        values.isSaveAsDraft = true;
        convertSubmitData(values, true);
        setIsSubmitAsDraft(true);
        values.issueStatusId = issueStatuses?.find((status) => status.code === ISSUE_STATUSES.DRAFT)?.id;
        if (issueId) {
          await issueService.updateIssue(
            workspaceId,
            projectId,
            issueId,
            values
          );
        } else {
          await issueService.createIssue(workspaceId, projectId, values);
        }
        setIsSubmitAsDraft(false);
        onFinish();
      } catch (error) {
        setIsSubmitAsDraft(false);
        message.error(t('Oop! Something wrong'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCallForReview = async () => {
    try {
      const values = await form.getFieldsValue();
      convertSubmitData(values);
      values.issueStatusId = issueStatuses?.find((status) => status.code === ISSUE_STATUSES.READY_FOR_INSPECTION)?.id;
      if (issueId) {
        await issueService.updateIssue(workspaceId, projectId, issueId, values);
      } else {
        await issueService.createIssue(workspaceId, projectId, values);
      }
      onFinish();
    } catch (error) {
      console.log(error);
    }
  };

  const onReject = async () => {
    try {
      const values = await form.getFieldsValue();
      convertSubmitData(values);
      values.issueStatusId = issueStatuses?.find((status) => status.code === ISSUE_STATUSES.OPEN)?.id;
      if (issueId) {
        await issueService.updateIssue(workspaceId, projectId, issueId, values);
      }
      onFinish();
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitForm = async () => {
    try {
      setIsSubmit(true);
      const values = await form.getFieldsValue();
      convertSubmitData(values);
      if (issueId) {
        await issueService.updateIssue(workspaceId, projectId, issueId, values);
      } else {
        await issueService.createIssue(workspaceId, projectId, values);
      }
      setIsSubmit(false);
      onFinish();
      setIsAssigneeEdit(false);
      setIsAssignerEdit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
    }
  };

  const onValidateForm = async () => {
    try {
      setIsSubmit(true);
      const values = await form.getFieldsValue();
      values.effectiveEndDate = dayjs();
      convertSubmitData(values);
      values.issueStatusId = issueStatuses?.find((status) => status.code === ISSUE_STATUSES.CLOSED)?.id;
      if (issueId) {
        await issueService.updateIssue(workspaceId, projectId, issueId, values);
      } else {
        await issueService.createIssue(workspaceId, projectId, values);
      }
      setIsSubmit(false);
      onFinish();
      setIsAssigneeEdit(false);
      setIsAssignerEdit(false);
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      setIsDelete(true);
      await issueService.deleteIssueById(
        workspaceId,
        projectId,
        issueId as string
      );
      setIsDelete(false);
      onFinish();
    } catch (error) {
      setIsDelete(false);
      message.error(t('Oop! Something wrong'));
    }
  };

  const getAttachments = async () => {
    try {
      setIsLoadingAttachment(true);
      const { rows } = await attachmentService.getAttachments(
        workspaceId,
        projectId,
        {
          projectId,
          issueId,
          attachmentTypeId: inpectionPhotoType?.id,
          limit: 'unlimited',
        }
      );
      setAttachments(rows);
      setIsLoadingAttachment(false);
    } catch (error) {
      setIsLoadingAttachment(false);
      message.error(t('Oop! Something wrong'));
    }
  };

  const handleToggleContent = () => {
    setCreateCollapse(true);
    setOpen(false);
  };

  const items: TabsProps['items'] = [
    {
      key: 'detail',
      label: t('Inspection details'),
      icon: <TagOutlined />,
      children: null,
    },
    {
      key: 'attachments',
      label: t('Attachments'),
      disabled: !issueId,
      icon: <LinkOutlined />,
      children: null,
    },
    {
      key: 'comments',
      label: t('History'),
      disabled: !issueId,
      icon: <CommentOutlined />,
      children: null,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key as WorkspaceViewType);
    if (key === 'attachments' && issueId) {
      getAttachments();
    }
  };

  const onClose = () => {
    setOpen(false);
    setIsModalVisible(false);
  };

  const handleShowDrawerContent = () => {
    setActiveTab('detail');
    setShowContent(false);
  };

  const onUpload = async (values: {
    imageURL: string;
    fileName: string;
    width: number;
    height: number;
  }) => {
    try {
      await attachmentService.createAttachment(workspaceId, projectId, {
        filePath: values.imageURL,
        name: values.fileName,
        width: values.width,
        height: values.height,
        attachmentTypeId: inpectionPhotoType?.id as string,
        zoneId: selectedIssue?.zoneId,
        issueId,
      });
      getAttachments();
      setIsUploading(false);
      setIsOpenUpload(false);
    } catch (error) {
      setIsUploading(false);
      message.error(t('Oop! Something wrong'));
      console.log(error);
    }
  };

  const onDeleteAttachment = async (attachmentId: string) => {
    try {
      await attachmentService.deleteAttachment(
        workspaceId,
        projectId,
        attachmentId
      );
      getAttachments();
    } catch (error) {
      message.error(t('Oop! Something wrong'));
    }
  };

  useEffect(() => {
    setShowContent(true);
    setActiveTab('detail');
  }, [props.isOpen]);

  const onChangeDiscipline = (value: string) => {
    const discipline = issueDisciplines?.find(
      (discipline) => discipline.id === value
    );
    setSelectedDiscipline(discipline || null);
  };
  const formValuesWatch = Form.useWatch([], form);

  useEffect(() => {
    if (!issueId && isOpen) {
      if (
        formValuesWatch?.issueDisciplineId &&
        formValuesWatch?.companyId &&
        formValuesWatch?.phaseId
      ) {
        setIsAvailableSubmit(true);
      } else {
        setIsAvailableSubmit(false);
      }
    } else if (issueId && isOpen) {
      if (
        formValuesWatch?.issueDisciplineId &&
        formValuesWatch?.companyId &&
        formValuesWatch?.phaseId &&
        formValuesWatch?.name !== '' &&
        formValuesWatch?.issueTypeId &&
        formValuesWatch?.issuePriorityId &&
        formValuesWatch?.zoneId
      ) {
        setIsAvailableSubmit(true);
      } else {
        setIsAvailableSubmit(false);
      }
    }
  }, [formValuesWatch]);

  const onChangeLocationPlan = (
    zoneId: string | null,
    planData: IssueAttachment | null,
    planImageData: Attachment | null
  ) => {
    form.setFieldValue('zoneId', zoneId);
    setPlan(planData);
    setPlanImage(planImageData);
  };

  const onChangeForm = (value: any) => {
    if (Object.keys(value)?.[0] === 'name') {
      setInspectionName(value.name ?? defaultName);
    }
    if (Object.keys(value)?.[0] === 'zoneId') {
      setPlan(null);
      setPlanImage(null);
    }
    setIsAssignerEdit(true);
  };

  const onClearInspectionPin = () => {
    setPlan(null);
    setPlanImage(null);
  };

  const miniPlanImage = useMemo(() => {
    return plan?.Attachment || planImage;
  }, [planImage, plan]);

  const onSubmitComment = () => {};

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      layout='vertical'
      onValuesChange={onChangeForm}
    >
      {isOpenUpload !== null && (
        <UploadPhotoModal
          isModalOpen={isOpenUpload}
          setIsModalOpen={setIsOpenUpload}
          onSubmit={onUpload}
          isLoading={isUploading}
          setIsLoading={setIsUploading}
        />
      )}
      {isOpenPin !== null && (
        <PinInspection
          isModalOpen={isOpenPin}
          setIsModalOpen={setIsOpenPin}
          onSubmit={onChangeLocationPlan}
          formInstance={form}
          plan={plan}
          inspectionName={inspectionName}
          planImage={planImage}
        />
      )}
      <Drawer
        title={
          <HeaderTask
            onClose={onClose}
            visible={isModalVisible}
            isCreateTaskVisible={isOpen}
            isUnSaveStatus={!issueId && isOpen}
            inspectionName={inspectionName}
            onToggleContent={handleToggleContent}
            onShowDrawerContent={handleShowDrawerContent}
            formInstance={form}
            descipline={selectedDiscipline}
            initialHeaderValue={''}
            selectedIssue={selectedIssue}
            users={users}
          />
        }
        placement={'right'}
        width={715}
        onClose={onClose}
        closeIcon={false}
        open={isOpen}
        maskClosable={false}
        destroyOnClose={false}
        footer={
          <FooterTask
            issue={selectedIssue}
            issueId={issueId}
            onSubmitComment={onSubmitComment}
            isDelete={isDelete}
            isSubmit={isSubmit}
            isSubmitAsDraft={isSubmitAsDraft}
            isAvailableSubmit={isAvailableSubmit}
            issueCode={selectedIssue?.IssueStatus?.code}
            onDelete={onDelete}
            onSubmit={onSubmit}
            onSubmitAsDraft={onSubmitAsDraft}
            isAssigneeEdit={isAssigneeEdit}
            isAssignerEdit={isAssignerEdit}
            onCallForReview={onCallForReview}
            profile={profile}
            users={users}
            onSubmitForm={() => onSubmitForm()}
            onValidateForm={() => onValidateForm()}
            onReject={() => onReject()}
            workspaceId={workspaceId}
            projectId={projectId}
            onFinish={onFinish}
          />
        }
      >
        <Spin spinning={isLoading}>
          {showContent && (
            <Tabs
              defaultActiveKey='detail'
              activeKey={activeTab}
              onChange={handleTabChange}
              items={items}
              tabBarExtraContent={
                <Flex justify={'space-between'} align={'center'}>
                  <Button
                    type='text'
                    size='small'
                    key={'detail'}
                    onClick={() => handleTabChange('detail')}
                  ></Button>
                  <Button
                    type='text'
                    size='small'
                    key={'attachments'}
                    onClick={() => handleTabChange('attachments')}
                  ></Button>
                  <Button
                    type='text'
                    size='small'
                    key={'comments'}
                    onClick={() => handleTabChange('comments')}
                  ></Button>
                </Flex>
              }
            />
          )}
          {showContent && (
            <>
              {activeTab === 'detail' && (
                <>
                  <CreateTaskDetail
                    issueDisciplines={issueDisciplines}
                    issuePriorities={issuePriorities}
                    issueTypes={issueTypes}
                    companies={companies}
                    users={users}
                    zones={zones}
                    form={form}
                    issue={selectedIssue}
                    phases={phases}
                    onChangeDiscipline={onChangeDiscipline}
                    isUnSaveStatus={!issueId && isOpen}
                    hasPlan={!!plan}
                    onSelectPlan={() => setIsOpenPin(true)}
                    onChangeWatcher={() => setIsAssigneeEdit(true)}
                    profile={profile}
                  />
                  {plan && miniPlanImage && (
                    <Flex justify='center'>
                      <MiniPlan
                        width={246}
                        onDelete={onClearInspectionPin}
                        filePath={miniPlanImage?.filePath as string}
                        imgWidth={miniPlanImage?.width as number}
                        imgHeight={miniPlanImage?.height as number}
                        onClick={() => setIsOpenPin(1)}
                        markers={[
                          {
                            posX: plan?.posX as number,
                            posY: plan?.posY as number,
                          },
                        ]}
                      />
                    </Flex>
                  )}
                </>
              )}
              {activeTab === 'attachments' && (
                <Spin spinning={isLoadingAttachment && !attachments?.length}>
                  <CreateAttachment
                    attachments={attachments}
                    onAddAttachment={setIsOpenUpload}
                    onDelete={onDeleteAttachment}
                    issue={selectedIssue}
                  />
                </Spin>
              )}
              {activeTab === 'comments' && (
                <CreateComment
                  isClosedStatus={
                    selectedIssue?.IssueStatus?.code === ISSUE_STATUSES.CLOSED
                  }
                />
              )}
            </>
          )}
        </Spin>
      </Drawer>
    </Form>
  );
}
