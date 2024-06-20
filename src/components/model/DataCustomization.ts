

export interface CategoriesType {
  key: string | number;
  name: string;
  code?: string;
  isCore?: boolean;
  isNewRecord?: boolean;
}

export interface ProjectType {
  key: string | number;
  name: string;
  code?: string;
  isCore?: boolean;
  picture?: string;
  icon?: any;
  iconColor?: string;
  isNewRecord?: boolean;
}

export interface EditableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
  index: string | number;
}
export interface EditableCellProps {
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof CategoriesType;
  record: CategoriesType;
  handleSave: (record: CategoriesType) => void;
  handleChangeShouldSubmit: (shouldSubmit: boolean) => void;
}

