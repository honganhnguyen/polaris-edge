export default interface IssueDiscipline {
  id: string;
  name: string;
  code?: string;
  order?: number;
  isCustom?: boolean;
  projectCreatedId?: string;
  workspaceCreatedId?: string;
  userCreatedId?: string;
}
