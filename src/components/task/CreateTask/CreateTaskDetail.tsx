import { Button, Col, DatePicker, Form, FormInstance, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';
import { BlockOutlined } from '@ant-design/icons';

import { SearchSelect } from 'components/common';
import {
  Company,
  Issue,
  IssueDiscipline,
  IssuePriority,
  IssueType,
  Phase,
  User,
  Zone,
} from 'model';
import { ISSUE_STATUSES } from 'utils/contants';
const { Option } = Select;

type CreateTaskDetailProps = {
  form: FormInstance;
  issue?: Issue | null;
  companies: Company[];
  users: User[];
  issuePriorities: IssuePriority[];
  issueDisciplines: IssueDiscipline[];
  issueTypes: IssueType[];
  zones: Zone[];
  phases: Phase[];
  onChangeDiscipline: (value: string) => void;
  isUnSaveStatus?: boolean;
  onSelectPlan?: () => void;
  hasPlan?: boolean;
  onChangeWatcher?: () => void;
  profile?: User | null;
};

export default function CreateTaskDetail(props: CreateTaskDetailProps) {
  const {
    issue,
    form,
    companies,
    users,
    issuePriorities,
    issueDisciplines,
    issueTypes,
    zones,
    phases,
    onSelectPlan,
    hasPlan,
    onChangeDiscipline,
    isUnSaveStatus,
    onChangeWatcher,
    profile,
  } = props;

  const { t } = useTranslation();
  const [selectedCompanyId, setSelectedCompanyId] = useState(issue?.companyId);
  const isAssiner = issue?.reporterId === profile?.id;
  const isAssinee = issue?.assigneeId === profile?.id;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const isClosedStatus = issue?.IssueStatus?.code === ISSUE_STATUSES.CLOSED;
  const assigneeFilter = users?.filter(
    (user) =>
      (!selectedCompanyId ||
        user.WorkspaceUser?.Company?.id === selectedCompanyId) &&
      user.id !== issue?.reporterId 
  );

  useEffect(() => {
    if (issue?.IssueStatus?.code !== ISSUE_STATUSES.DRAFT) {
      setIsDisabled(true);
    }
    if(isUnSaveStatus) {
      setIsDisabled(false);
    }
  }, [issue?.IssueStatus, isUnSaveStatus]);

  useEffect(() => {
    const existingCompany = companies?.findIndex(
      (company) => company.id === issue?.companyId
    );
    form.setFieldValue(
      ['companyId'],
      existingCompany > -1 ? issue?.companyId : null
    );
    setSelectedCompanyId(issue?.companyId);
  }, [issue?.companyId]);

  useEffect(() => {
    if (issue?.assigneeId && assigneeFilter && assigneeFilter.length > 0) {
      const findAssignee = assigneeFilter?.find(
        (user) => user.id === issue?.assigneeId
      );
      if (!findAssignee) form.setFieldValue('assigneeId', null);
    }
  }, [assigneeFilter, issue?.assigneeId]);

  // useEffect(() => {
  //   if (zones?.length) {
  //     form.setFieldValue('zoneId', zones?.find((zone) => zone.parentId === null)?.id || '');
  //   }
  // }, [zones?.length]);

  const onChangeCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    form.setFieldValue('assigneeId', null);
  };

  const onChangeAssignee = (assigneeId: string) => {
    const selectedUser = users?.find((user) => user.id === assigneeId);
    const existingCompany = companies?.findIndex(
      (company) => company.id === selectedUser?.WorkspaceUser?.Company?.id
    );
    form.setFieldValue(
      ['companyId'],
      existingCompany > -1 ? selectedUser?.WorkspaceUser?.Company?.id : null
    );
  };

  return (
    <div className='create-issue-form'>
      <Row>
        <Col span={24}>
          <Form.Item
            name='name'
            label={t('Inspection name')}
            rules={[
              { required: true, message: '' },
              {
                max: 50,
                message: t('Inspection name cannot exceed 50 characters'),
              },
            ]}
          >
            <TextArea
              allowClear
              placeholder={t('Enter inspection name')}
              autoSize={{ minRows: 1, maxRows: 6 }}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='issueTypeId'
            label={t('Inspection type')}
            rules={[{ required: true, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select type')}
              options={issueTypes?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='issueDisciplineId'
            label={t('Inspection discipline')}
            rules={[{ required: true, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select discipline')}
              onChange={onChangeDiscipline}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              options={issueDisciplines?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='companyId'
            label={t('Company assignee')}
            rules={[{ required: true, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select')}
              onChange={onChangeCompany}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              options={companies?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='assigneeId'
            label={t('Assignee')}
            rules={[{ required: false, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select')}
              onChange={onChangeAssignee}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              options={assigneeFilter
                ?.map((option) => {
                  return {
                    value: option.id,
                    label: option.fullName,
                  };
                })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name='issuePriorityId'
            label={t('Priority')}
            rules={[{ required: true, message: '' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder='Select priority'
              defaultValue={[t('Select priority')]}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
            >
              {issuePriorities?.map((option) => (
                <Option key={option.id} value={option.id} label={option.name}>
                  <div>
                    {option.icon && (
                      <img
                        src={option.icon}
                        alt=''
                        width={16}
                        height={16}
                        className='mr-2'
                      />
                    )}
                    <span>{option.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='phaseId'
            label={t('Phase')}
            rules={[{ required: true, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select')}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              options={phases?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='plannedStartDate' label={t('Inspection date')}>
            <DatePicker
              disabled={
                (isDisabled && (isAssiner || isAssinee)) || isClosedStatus
              }
              placeholder={t('Select')}
              style={{ width: '100%' }}
              format='YYYY-MM-DD'
            />
          </Form.Item>
        </Col>

        {!isClosedStatus ? (
          <Col span={12}>
            <Form.Item
              name='plannedEndDate'
              label={t('Deadline')}
              rules={[
                { required: false },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue('plannedStartDate') ||
                      (value &&
                        getFieldValue('plannedStartDate') &&
                        value >= getFieldValue('plannedStartDate'))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error());
                  },
                }),
              ]}
            >
              <DatePicker
                disabled={(isDisabled && isAssinee) || isClosedStatus}
                placeholder={t('Select date')}
                style={{ width: '100%' }}
                format='YYYY-MM-DD'
              />
            </Form.Item>
          </Col>
        ) : (
          <Col span={12}>
            <Form.Item
              name='effectiveEndDate'
              label={t('End date')}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue('effectiveEndDate') ||
                      (value &&
                        getFieldValue('v') &&
                        value >= getFieldValue('effectiveEndDate'))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error());
                  },
                }),
              ]}
            >
              <DatePicker
                placeholder={t('Select date')}
                style={{ width: '100%' }}
                format='YYYY-MM-DD'
                disabled={isClosedStatus}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      {/* <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='effectiveStartDate' label={t('Start date') }>
            <DatePicker
              disabled={false}
              placeholder={t('Select date')}
              style={{ width: '100%' }}
              format='YYYY-MM-DD'
            />
          </Form.Item>
        </Col> */}

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='watcherIds'
            label={t('Watcher(s)')}
            rules={[{ required: false, message: '' }]}
          >
            <SearchSelect
              disabled={isClosedStatus}
              onChange={onChangeWatcher}
              showSearch
              mode='multiple'
              allowClear
              maxTagCount='responsive'
              placeholder={t('Add watcher(s)')}
              optionFilterProp='children'
              options={users?.map((option) => ({
                value: option.id,
                label: option.email,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            name='description'
            label={t('Description')}
            rules={[
              {
                max: 300,
                message: t('Description cannot exceed 300 characters'),
              },
            ]}
          >
            <TextArea
              placeholder={t('Enter Description')}
              autoSize={{ minRows: 1, maxRows: 6 }}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} align='top'>
        <Col span={12}>
          <Form.Item
            name='zoneId'
            label={t('Zoning')}
            rules={[{ required: true, message: '' }]}
          >
            <SearchSelect
              placeholder={t('Select')}
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              defaultValue={
                zones?.find((zone) => zone.parentId === null)?.id || ''
              }
              options={zones?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label=' '>
            <Button
              disabled={(isDisabled && isAssinee) || isClosedStatus}
              className='primary-dashed-btn'
              icon={<BlockOutlined />}
              type='dashed'
              onClick={onSelectPlan}
              style={{ width: '100%' }}
            >
              {hasPlan ? t('Edit location') : t('Add location')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
      {/* <div className='sub-title mt-6'>
        Inspection #1232 created by John Smith on 2024-01-15 @ 08:15
      </div> */}
      {/* <Divider className='customize-divider mt-6' /> */}
    </div>
  );
}
