import { CommentOutlined, LinkOutlined, TagOutlined } from '@ant-design/icons';
import { Form, Drawer, Flex, Button, Tabs, TabsProps } from 'antd';
import CustomHeaderModalEdit from 'components/task/EditTask/HeaderTaskEdit';
import { useTranslation } from 'react-i18next';
import type { DrawerProps } from 'antd/es/drawer';
import { useEffect, useState } from 'react';
import EditTaskDetail from './EditTaskDetail';
import EditAttachment from './EditAttachment';
import EditComment from './EditComment';

type EditTaskProps = {
  isOpen: boolean;
  onSubmit: () => void;
  setOpen: (value: boolean) => void;
  taskData?: {
    name: string;
  };
  editTaskId: string | null;
};

export type WorkspaceViewType = 'detail' | 'attachments' | 'comments';

export default function EditTask(props: EditTaskProps) {
  const { isOpen, setOpen, onSubmit, taskData, editTaskId } = props;
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(isOpen);

  const [activeTab, setActiveTab] = useState<WorkspaceViewType>('detail');

  const [showContent, setShowContent] = useState(true);

  const [drawerKey, setDrawerKey] = useState(0);

  const handleToggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  const items: TabsProps['items'] = [
    {
      key: 'detail',
      label: t('Task details'),
      icon: <TagOutlined />,
      children: null,
    },
    {
      key: 'attachments',
      label: t('Attachements'),
      icon: <LinkOutlined />,
      children: null,
    },
    {
      key: 'comments',
      label: t('History'),
      icon: <CommentOutlined />,
      children: null,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key as WorkspaceViewType);
  };

  const showDrawer = () => {
    setOpen(true);
    setIsModalVisible(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsModalVisible(false);
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (isOpen) {
      saveFormData(allValues);
    }
  };

  const saveFormData = (formData: any) => {
    console.log('Form data saved:', formData);
  };

  const handleSubmit = () => {
    onClose(); // Close the drawer explicitly when submitting the form
    onSubmit(); // Trigger the onSubmit callback
  };

  useEffect(() => {
    setIsModalVisible(isOpen); // Update the visibility state when isOpen changes
  }, [isOpen]);

  const handleShowDrawerContent = () => {
    setActiveTab('detail');
    setShowContent(false);
  };

  const showInput = '';

  return (
    <>
      <Drawer
        title={
          <CustomHeaderModalEdit
            onClose={onClose}
            visible={isModalVisible}
            isCreateTaskVisible={props.isOpen}
            onToggleContent={handleToggleContent}
            onShowDrawerContent={handleShowDrawerContent}
          />
        }
        placement={placement}
        width={showContent ? 715 : 50}
        style={
          showContent
            ? {}
            : {
                borderRadius: '50px',
                height: '50px',
                background: '#053452',
                overflow: 'hidden',
              }
        }
        onClose={onClose}
        closeIcon={false}
        visible={isOpen}
        maskClosable={true}
      >
        <Form form={form} onValuesChange={handleValuesChange}>
          {showContent && (
            <Tabs
              defaultActiveKey="detail"
              activeKey={activeTab}
              onChange={handleTabChange}
              items={items}
              tabBarExtraContent={
                <Flex justify={'space-between'} align={'center'}>
                  <Button
                    type="text"
                    size="small"
                    key={'detail'}
                    onClick={() => handleTabChange('detail')}
                  ></Button>
                  <Button
                    type="text"
                    size="small"
                    key={'attachments'}
                    onClick={() => handleTabChange('attachments')}
                  ></Button>
                  <Button
                    type="text"
                    size="small"
                    key={'comments'}
                    onClick={() => handleTabChange('comments')}
                  ></Button>
                </Flex>
              }
            />
          )}
        </Form>
        {showContent && (
          <>
            {activeTab === 'detail' && <EditTaskDetail />}
            {activeTab === 'attachments' && <EditAttachment />}
            {activeTab === 'comments' && <EditComment />}
          </>
        )}
      </Drawer>
    </>
  );
}
