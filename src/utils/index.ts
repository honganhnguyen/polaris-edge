import { TreeDataNode } from "antd";
import { DataNode } from "antd/es/tree";
import { Zone } from "model";

export function mergeArraysByKey(array1: any[], array2: any[], key = 'id') {
  return array1.map((item1) => {
    const matchingItem = array2.find((item2) => item2[key] === item1[key]);
    return { ...item1, ...matchingItem };
  });
}

export function sortByName(array: any, key: string) {
  return array.sort(function (a: any, b: any) {
    let x = a[key]?.toLowerCase();
    let y = b[key]?.toLowerCase();

    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });
}

// Function to get current date in Year/Month/Day format
export const getCurrentDatePath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

export function stringToBoolean(str: string): boolean {
    return str.toLowerCase() === "true";
}

export const convertZonesToTreeData = (
  items: any[],
  parentId: string | null = null,
  level: number = 0
): DataNode[] => {
  const tree: DataNode[] = [];
  items?.forEach((item: any) => {
    if (item.parentId === parentId) {
      const children = convertZonesToTreeData(items, item.id, level + 1);
      const node: DataNode = {
        title: item.name,
        key: item.id,
        children: children.length > 0 ? children : undefined,
      };
      tree.push(node);
    }
  });
  return tree;
};

