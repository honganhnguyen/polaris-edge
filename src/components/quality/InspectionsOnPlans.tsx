import { Col, Layout, Row, TreeDataNode, TreeProps, Typography } from 'antd';
import { Tree } from 'antd';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PlanItem from './InspectionPlans/PlanItems';
import { useEffect, useMemo, useState } from 'react';
import { useProjectZones, useProjectZonesParams } from 'hooks/zone';
import { convertZonesToTreeData } from 'utils';
import {
  useAttachmentTypes,
  useAttachmentTypesParams,
  useProjectAttachments,
  useProjectAttachmentsParams,
} from 'hooks';
import { ATTACHMENT_TYPES } from 'utils/contants';
const { Content } = Layout;
const { Paragraph } = Typography;

const motionItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

type InspectionsOnPlans = {
  workspaceId: string;
  projectId: string;
  onEditIssue: (value: string) => void;
}
export default function InspectionsOnPlans(props: InspectionsOnPlans) {
  const { workspaceId, projectId, onEditIssue } = props;
  const { t } = useTranslation();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [query] = useProjectZonesParams({
    projectId: projectId as string,
    workspaceId,
    orderBy: 'createdAt,desc',
  });
  const [zones] = useProjectZones(query);
  const generalZone = zones?.find((zone) => !zone.parentId)
  const [zoneId, setZoneId] = useState<string>(generalZone?.id ?? '');
  const selectedZone = zones?.find(zone => zone.id === zoneId);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    generalZone?.id ?? '',
  ]);
  const [attachmentTypesParams] = useAttachmentTypesParams();
  const [attachmentTypes] = useAttachmentTypes(attachmentTypesParams);
  const locationPlanType = attachmentTypes.find(
    (attachmentType) => attachmentType.code === ATTACHMENT_TYPES.LOCATION_PLAN
  );
  const [attachmentQuery] = useProjectAttachmentsParams({
    projectId: projectId as string,
    workspaceId,
    ...(locationPlanType ? { attachmentTypeId: locationPlanType.id } : {}),
  });
  const [attachments, attachmentsLoading, refreshAttachments] =
    useProjectAttachments(attachmentQuery);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (selectedKeys && selectedKeys.length > 0) {
      setZoneId(selectedKeys[0] as string);
    }
    setSelectedKeys(selectedKeys as string[]);
    console.log('selected', selectedKeys, info);
  };

  const onExpand: TreeProps['onExpand'] = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys as string[]);
  };

  const treeData = useMemo(() => {
    if (zones) {
      const zonesTree = convertZonesToTreeData(zones);
      return zonesTree;
    }
  }, [zones]);

  useEffect(() => {
    const collectAllKeys = (nodes: TreeDataNode[]): string[] => {
      let keys: string[] = [];
      nodes.forEach((node) => {
        keys.push(node.key as string);
        if (node.children) {
          keys = [...keys, ...collectAllKeys(node.children)];
        }
      });
      return keys;
    };

    if (treeData) {
      const allKeys = collectAllKeys(treeData);
      setExpandedKeys(allKeys);
    }
  }, [treeData]);

  useEffect(() => {
    const selectedZone = zones?.find((zone) => zone.id === zoneId);
    if (zoneId !== '' && zoneId !== 'root' && selectedZone?.parentId) {
      refreshAttachments({
        projectId: projectId as string,
        workspaceId,
        ...(locationPlanType ? { attachmentTypeId: locationPlanType.id } : {}),
        ...(zoneId ? { zoneId } : {}),
      });
    } else {
      refreshAttachments({
        projectId: projectId as string,
        workspaceId,
        ...(locationPlanType ? { attachmentTypeId: locationPlanType.id } : {}),
      });
    }
  }, [selectedKeys, zoneId]);

  return (
    <Content className='settings-content px-0 py-0'>
      <Row gutter={24}>
        <Col flex='23%' className='bg-gray px-4 py-4'>
          <div>
            <Paragraph className='px-4 mb-9'>
              {t('Select zone to view plans and create inspections')}
            </Paragraph>
            <Tree
              showLine
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              onExpand={onExpand}
              onSelect={onSelect}
              treeData={treeData}
              className='bg-gray'
            />
          </div>
        </Col>
        <Col flex='77%' className=''>
          <div className='workspaces photos px-4'>
            {selectedZone && (
              <Typography.Title level={5}>
                {t(`${selectedZone?.name}`)} (
                {attachments?.filter((attachment) => attachment.zoneId)?.length}
                )
              </Typography.Title>
            )}
            <div className='workspaces-list mt-9'>
              <Row gutter={16} style={{ width: '100%' }}>
                {attachments
                  ?.filter((attachment) => attachment.zoneId)
                  ?.map((attachment, index) => (
                    <Col
                      xs={8}
                      sm={8}
                      className='full-width-col'
                      key={attachment.id}>
                      <motion.div
                        key={attachment.id}
                        variants={motionItem}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut',
                          delay: index * 0.25,
                        }}
                        style={{ marginBottom: '15px' }}>
                        <PlanItem attachment={attachment} />
                      </motion.div>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Content>
  );
}
