export default interface ProjectType {
  id: string;
  name: string;
  code?: string;
  isCore?: boolean;
  picture?: string;
  icon?: any;
  iconColor?: string;
  isCustom: boolean;
}