export interface disciplineType {
  key: string | number;
  name: string;
  code?: string;
  isCore?: boolean;
}

export interface EditableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
  index: string | number;
}
export interface EditableCellProps {
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof disciplineType;
  record: disciplineType;
  handleSave: (record: disciplineType) => void;
}

