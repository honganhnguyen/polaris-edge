import { useEffect, useState } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Button, Typography, Layout, Flex, Tabs, MenuProps, Segmented } from 'antd';
import {
  PlusOutlined,
  BarsOutlined,
  FileSyncOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  InspectionsStatistic,
  InspectionsListView,
  InspectionsOnPlans,
} from 'components';
import CreateTask from 'components/task/CreateTask/CreateTask';

import SVGFloorplan from 'assets/images/carbon_floorplan.svg';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';
import { selectMyWorkspace } from 'store/my-workspace.slice';

import CircularButton from 'components/task/CreateTask/CircularButton';
import { useProjectIssues, useProjectIssuesParams } from 'hooks/issue';
import { useProjectIssueKpis, useProjectIssueKpisParams } from 'hooks';

type InspectionsProps = {
  module: string;
  workspaceId: string;
}
export default function Inspections(props: InspectionsProps) {
  const { module, workspaceId } = props;
  const { t } = useTranslation();
  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(null);
  const [isCreateCollapse, setIsCreateCollapse] = useState(false);
  const [issueId, setIssueId] = useState<string | null>(null);
  const [isCreateTaskVisible, setIsCreateTaskVisible] = useState(false);
  const [activeTabView, setActiveTabView] = useState('listView');
  const [activeTabInspections, setActiveTabInspections] = useState('allInspections');
  const params = useParams();
  const projectId = params.projectId as string;
  const [query] = useProjectIssuesParams({
    projectId: projectId as string,
    workspaceId,
    module,
    include: 'IssuePriority|IssueStatus|IssueType|Company|Zone|IssueDiscipline|Plans|Photos',
    orderBy: 'createdAt,desc',
  });
  const [issues, loadingIssues, refreshIssues] = useProjectIssues(query);
  const [issueKpisquery] = useProjectIssueKpisParams({
    projectId: projectId as string,
    workspaceId,
    module,
  });
  const [issueKpis, loadingIssueKpis, refreshIssuesKpis] = useProjectIssueKpis(issueKpisquery);

  useEffect(() => {
    if (isFormOpen !== null && !isFormOpen) {
      refreshIssues();
      refreshIssuesKpis();
    }
  }, [isFormOpen]);

  const handleMenuClick: MenuProps['onClick'] = (info: MenuInfo) => {
    const { key } = info;

    if (key) {
      switch (key) {
        case 'edit':
          handleEditTask(info);
          break;
        case 'delete':
          handleDeleteTask(info);
          break;
        default:
          break;
      }
    }
  };
  const handleDeleteTask = (info: MenuInfo) => {
    const taskId = info?.key;
    if (taskId) {
      console.log(`Deleting task with ID: ${taskId}`);
    }
  };
  const onOpenIssueForm = (issueId: string | null) => {
    setIsCreateCollapse(false);
    setIsCreateTaskVisible(true);
    setIsFormOpen(true);
    setIssueId(issueId);
  };

  const onSubmitCreate = () => {
    setIsCreateTaskVisible(false);
    setIsFormOpen(false);
    setTimeout(() => {
      setIssueId(null);
    }, 200);
  };

  const handleEditTask = (info: MenuInfo) => {
    const taskId = info?.key;
    if (taskId) {
      console.log(`Editing task with ID: ${taskId}`);
      setIssueId(taskId);
      setIsFormOpen(false);
    }
  };
  return (
    <Layout.Content className='settings-content'>
      {/* {isCreateCollapse &&
        CircularButton({
          label: initialHeaderValue.toString().substring(0,1).toUpperCase() || '-',
          onClick: () => {
            setIsCreateCollapse(false);
            setIsFormOpen(true);
          },
        })} */}
      {isFormOpen !== null && (
        <CreateTask
          isOpen={isFormOpen}
          setOpen={setIsFormOpen}
          setCreateCollapse={setIsCreateCollapse}
          onFinish={onSubmitCreate}
          module={module}
          issueId={issueId}
          refreshIssues={refreshIssues}
          workspaceId={workspaceId}
        />
      )}
      <Flex className='mb-4'>
        <Typography.Title level={2} className='mr-16'>
          {t('Inspections')}
        </Typography.Title>
        <Segmented
          size="large"
          className='inspection-segmented'
          options={[
            { label: t('As a list'), value: 'listView', icon: <BarsOutlined /> },
            { label: t('On zoning plans'), value: 'plansView', icon: <img src={SVGFloorplan} alt='' width={16} height={16} /> },
          ]}
          defaultValue={activeTabView}
          onChange={(value) => setActiveTabView(value as string)}
        />
      </Flex>

      {/*
      <Tabs
        className='inspection-tabs-view'
        tabBarExtraContent={{
          left: (
            <Typography.Title level={2} className='mr-16'>
              {t('View inspections')}
            </Typography.Title>
          ),
        }}
        activeKey={activeTabView}
        onChange={(key) => setActiveTabView(key as string)}
        items={[
          {
            key: 'listView',
            label: t('As a list of inspections'),
            icon: <BarsOutlined />,
            children: null,
          },
          {
            key: 'plansView',
            label: t('As pins localized on plans'),
            icon: <img src={SVGFloorplan} alt='' width={16} height={16} />,
            children: null,
          },
        ]}
      />
      */}

      <Tabs
        activeKey={activeTabInspections}
        onChange={(key) => setActiveTabInspections(key as string)}
        items={[
          {
            key: 'allInspections',
            label: `${t('All inspections')} (${'600'})`,
            children: null,
          },
          {
            key: 'companyInspections',
            label: `${t('Company inspections')} (${'200'})`,
            children: null,
          },
          {
            key: 'myInspections',
            label: `${t('My inspections')} (${'50'})`,
            children: null,
          },
          {
            key: 'watchedInspections',
            label: `${t('Watched')} (${'123'})`,
            children: null,
          },
        ]}
        tabBarExtraContent={
          activeTabView !== 'listView' ? null : (
            <Flex>
              <EllipsisOutlined className='iconSync mr-2' />
              <Button icon={<FileSyncOutlined />} >
                {t('Generate report')}
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => onOpenIssueForm(null)}
              >
                {t('Add inspection')}
              </Button>
            </Flex>
          )
        }
      />
      <InspectionsStatistic kpiData={issueKpis?.kpiData} />
      {activeTabView === 'listView' ? (
        <InspectionsListView
          activeTab={activeTabInspections}
          projectId={projectId}
          workspaceId={workspaceId}
          issues={issues}
          loading={loadingIssues === 'pending' && !issues?.length}
          onEditIssue={onOpenIssueForm}
          refreshIssues={refreshIssues}
        />
      ) : (
        <InspectionsOnPlans
          workspaceId={workspaceId}
          projectId={projectId}
          onEditIssue={onOpenIssueForm}
        />
      )}
    </Layout.Content>
  );
}
