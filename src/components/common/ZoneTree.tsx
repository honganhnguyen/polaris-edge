import { useEffect, useMemo, useState } from 'react';
import { Tree, TreeDataNode, TreeProps } from 'antd';
import { useProjectZones, useProjectZonesParams } from 'hooks';
import { convertZonesToTreeData } from 'utils';

type ZoneTreeProps = {
  projectId: string;
  workspaceId: string;
  selectedZoneId?: string | null;
  onSelectZone?: (zoneId: string) => void;
};

export default function ZoneTree(props: ZoneTreeProps) {
  const { projectId, workspaceId, onSelectZone, selectedZoneId } = props;
  const [query] = useProjectZonesParams({
    projectId: projectId as string,
    workspaceId,
    orderBy: 'createdAt,desc',
  });
  const [zones] = useProjectZones(query);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

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
    if (selectedZoneId) {
      setSelectedKeys([selectedZoneId]);
    }
  }, [selectedZoneId]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if (selectedKeys && selectedKeys.length > 0) {
      onSelectZone && onSelectZone(selectedKeys[0] as string);
    }
    setSelectedKeys(selectedKeys as string[]);
  };

  const onExpand: TreeProps['onExpand'] = (expandedKeys, info) => {
    setExpandedKeys(expandedKeys as string[]);
  };

  return (
    <Tree
      showLine
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onExpand={onExpand}
      onSelect={onSelect}
      treeData={treeData}
    />
  );
}
