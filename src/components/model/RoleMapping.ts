import Role from './Role';

export default interface RoleMapping {
  id: string;
  userId: string;
  referenceId: string;
  roleId: string;
  Role: Role;
}
