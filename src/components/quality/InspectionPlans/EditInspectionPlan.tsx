import { CommentOutlined, LinkOutlined, TagOutlined } from '@ant-design/icons';
import { Form, Drawer, Flex, Button, Tabs, TabsProps } from 'antd';
import HeaderEditInspectionPlan from './HeaderEditInspectionPlan';
import { useTranslation } from 'react-i18next';
import type { DrawerProps } from 'antd/es/drawer';
import { useEffect, useState } from 'react';
import EditInspectionDetails from './EditInpectionDetails';
import EditAttachment from './EditAttachment';
import EditComment from './EditComment';

type EditInspectionProps = {
  isOpen: boolean;
  onSubmit: () => void;
  setOpen: (value: boolean) => void;
  inspectionData?: {
    name: string;
  };
  editInspectionId: string | null;
};

export type WorkspaceViewType = 'detail' | 'attachments' | 'comments';

export default function EditInspection(props: EditInspectionProps) {
  const { isOpen, setOpen, onSubmit, inspectionData, editInspectionId } = props;
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
      label: t('Inspection details'),
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
          <HeaderEditInspectionPlan
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
            {activeTab === 'detail' && <EditInspectionDetails />}
            {activeTab === 'attachments' && <EditAttachment />}
            {activeTab === 'comments' && <EditComment />}
          </>
        )}
      </Drawer>
    </>
  );
}
