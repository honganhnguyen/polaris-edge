import { useState } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import {
  Button,
  Breadcrumb,
  Typography,
  Layout,
  Flex,
  Tabs,
  Table,
  Tag,
  Dropdown,
  MenuProps,
  Statistic,
  Card,
} from 'antd';
import {
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SyncOutlined,
  ArrowUpOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Attachment, Issue, IssueStatus, User } from 'model';
import { ColumnsType } from 'antd/es/table';
import SearchInputUser from 'components/common/SearchInputUser';
import avatar from '../../assets/images/user-avatar.png';
import { useAppSelector } from 'store';
import { selectMyWorkspace } from 'store/my-workspace.slice';
import { useProjectIssues, useProjectIssuesParams } from 'hooks/issue';
import {
  TASK_PRIORITY,
  TASK_STATUS_COLOR,
  TASK_ATTACHMENT_TYPE,
  ISSUE_STATUSES,
} from 'utils/contants';
import {
  useAttachmentTypes,
  useAttachmentTypesParams,
} from 'hooks/attachmentType';
import {
  useMyWorkspaceUsers,
  useMyWorkspaceUsersParams,
  useProjectUsers,
  useProjectUsersParams,
} from 'hooks';
import useAuthContext from 'store/auth-context';

type InspectionsProps = {
  activeTab: string;
  projectId: string;
  workspaceId: string;
  issues: Issue[];
  onEditIssue: (value: string) => void;
  refreshIssues: () => void;
  loading?: boolean;
};
export default function InspectionsListView(props: InspectionsProps) {
  const {
    activeTab,
    projectId,
    workspaceId,
    issues,
    onEditIssue,
    refreshIssues,
    loading,
  } = props;
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editIssueId, setEditIssueId] = useState<string | null>(null);
  const myWorkspace = useAppSelector(selectMyWorkspace);
  // const workspaceId = myWorkspace?.id as string;
  // const [query] = useProjectIssuesParams({
  //   projectId: projectId as string,
  //   workspaceId,
  //   include: 'IssuePriority|IssueStatus|IssueType|Company|Zone|Attachments|IssueDiscipline',
  //   orderBy: 'createdAt,desc',
  // });
  // const [issues, loading, refreshIssues] = useProjectIssues(query);
  const [attachmentTypesParams] = useAttachmentTypesParams();
  const [attachmentTypes] = useAttachmentTypes(attachmentTypesParams);
  const [queryUser] = useProjectUsersParams({
    projectId,
    workspaceId,
  });
  const [users, loadingUser, refreshUser, isError] = useProjectUsers(queryUser);

  const { profile } = useAuthContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { t } = useTranslation();

  const handleMenuClick = (info: MenuInfo, issueId: string) => {
    const { key } = info;

    if (key) {
      switch (key) {
        case 'edit':
          onEditIssue(issueId);
          break;
        case 'delete':
          handleDeleteIssue(info);
          break;
        default:
          break;
      }
    }
  };
  const handleDeleteIssue = (info: MenuInfo) => {
    const issueId = info?.key;
    if (issueId) {
      console.log(`Deleting inspection with ID: ${issueId}`);
    }
  };
  const handleEditIssue = (info: MenuInfo) => {
    const issueId = info?.key;
    if (issueId) {
      console.log(`Editing inspection with ID: ${issueId}`);
      setEditIssueId(issueId);
      setIsCreateOpen(false);
      setIsEditOpen(true);
    }
  };
  const getNameInitials = (name: string): String => {
    const words = name.trim().split(' ');

    if (words?.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (
        words[0].substring(0, 1).toUpperCase() +
        words[1].substring(0, 1).toUpperCase()
      );
    }
  };

  const items: MenuProps['items'] = [
    {
      label: t('Edit inspection'),
      key: 'edit',
      icon: <EditOutlined />,
      danger: false,
    },
    {
      label: t('Delete inspection'),
      key: 'delete',
      icon: <CloseCircleOutlined />,
      danger: true,
    },
  ];

  const menuProps: MenuProps = {
    items,
  };

  const fetchData = (value: string, callback: (data: User[]) => void) => {
    callback(users);
  };

  const renderPlanImage = (attachments: Attachment[]) => {
    const lpAttachments = attachments
      .filter((attachment) => {
        const attachmentTypeCode = attachmentTypes.find(
          (t) => t.id === attachment.attachmentTypeId
        )?.code;
        return attachmentTypeCode === TASK_ATTACHMENT_TYPE.IP;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    const latestLPAttachment = lpAttachments[0];

    return (
      <img
        src={
          latestLPAttachment ? latestLPAttachment.filePath : 'defaultImagePath'
        }
        alt=''
        width={80}
        className='border-image'
      />
    );
  };

  const renderStatusTag = (value: IssueStatus, record: any) => {
    const isReadyForInspection: boolean = value.code === ISSUE_STATUSES.READY_FOR_INSPECTION;
    const isOpen: boolean = value.code === ISSUE_STATUSES.OPEN;
    const isExpired: boolean = (new Date(record?.plannedEndDate) < new Date()) && record?.plannedEndDate;
    
    return (
      <>
        {isReadyForInspection && isExpired ? (
            <Tag
              color={TASK_STATUS_COLOR[ISSUE_STATUSES.READY_FOR_INSPECTION_OVERDUE]}
            >
              {value.name}
            </Tag>
          ) : isOpen && isExpired ? (
            <Tag
              color={TASK_STATUS_COLOR[ISSUE_STATUSES.OPEN_OVERDUE]}
            >
              {value.name}
            </Tag>
          ) : (
            <Tag color={TASK_STATUS_COLOR[value.code]}>
              {value.name}
            </Tag>
          )
        }
      </>
    );
  }

  const columns: ColumnsType<Issue> = [
    {
      title: t('Inspection name'),
      dataIndex: 'name',
      render: (name, record) => (
        <Flex align='center'>
          <span className='circle-fill mr-2' style={{ minWidth: '30px' }}>
            {record?.IssueDiscipline?.code}
          </span>
          <span>{name ? name : ''}</span>
        </Flex>
      ),
      width: '280px',
    },
    {
      title: t('Inspection type'),
      dataIndex: 'IssueType',
      render: (type) => <span>{type?.name}</span>,
      // width: '160px',
    },
    {
      title: t('Zoning'),
      dataIndex: 'Zone',
      render: (zone) => <span>{zone?.name}</span>,
      // width: '160px',
    },
    {
      title: t('Company'),
      dataIndex: 'Company',
      render: (company) => <span>{company?.name}</span>,
      // width: '89px',
    },
    {
      title: t('Assignee'),
      dataIndex: 'assigneeId',
      render: (assigneeId, record) => {
        const assigneeName = users?.find(
          (user) => user.id === assigneeId
        )?.fullName;
        return (
          <SearchInputUser
            users={users}
            dynamicClassName='search-user'
            refreshUser={refreshUser}
            refreshIssues={refreshIssues}
            workspaceId={workspaceId}
            projectId={projectId}
            issueId={record.id}
            companyId={record?.Company?.id}
            assigneeName={assigneeName}
            reporterId={record.reporterId}
            profileId={profile?.id}
            assigneeId={assigneeId}
            status={record.IssueStatus?.code}
          />
        );
      },
      // width: '120px',
    },
    {
      title: t('Priority'),
      dataIndex: 'IssuePriority',
      render: (priority) => {
        return priority?.icon ? (
          <>
            <img
              src={priority?.icon}
              alt=''
              className='mr-2'
              width={16}
              height={16}
            />
            {/* <span>{priority?.name}</span> */}
          </>
        ) : (
          <></>
        );
      },
      // width: '120px',
    },
    {
      title: t('Status'),
      dataIndex: 'IssueStatus',
      render: (value, record) => renderStatusTag(value, record),
    },
    {
      title: '',
      dataIndex: 'id',
      render: (value, record: Issue) => (
        <Flex justify={'flex-end'}>
          {record.Photos?.length > 0 && (
            <img
              src={record.Photos[0].filePath}
              alt=''
              height={24}
              className='border-image ma-2'
            />
          )}
          {(record.Plans?.length || 0) > 0 && (
            <img
              src={record.Plans?.[0].filePath}
              alt=''
              height={24}
              className='border-image ma-2'
            />
          )}
          <Dropdown
            menu={{
              ...menuProps,
              onClick: (info) => handleMenuClick(info, value),
            }}
            trigger={['click']}
          >
            <EllipsisOutlined className='icon-ellipse' />
          </Dropdown>
        </Flex>
      ),
    },
  ];

  const filteredData = issues?.filter((issue) => {
    if (activeTab === 'allInspections') {
      return true;
      // return issue.reporterId === profile?.id || issue.assigneeId === profile?.id;
    } else if (activeTab === 'companyInspections') {
      return issue.Company && issue.Company.name === 'Lighten corp';
    } else if (activeTab === 'myInspections') {
      return issue.assigneeId === profile?.id;
    } else {
      return issue.IssueStatus && issue.IssueStatus.code === activeTab;
    }
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: Issue[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: Issue) => ({
      name: record.name,
    }),
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: t('Select Odd Row'),
        onSelect: (changeableRowKeys: any[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_: any, index: number) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: t('Select Even Row'),
        onSelect: (changeableRowKeys: any[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter(
            (_: any, index: number) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            }
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Layout.Content className='settings-content'>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={{
          pageSize: 10,
        }}
        loading={loading}
        className='workspaces-list-table'
        columns={columns}
        rowKey={(row) => row.id}
        dataSource={filteredData as Issue[]}
        scroll={{ x: 'max-content' }}
      />
    </Layout.Content>
  );
}
