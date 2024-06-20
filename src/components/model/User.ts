import Company from "./Company";
import Project from "./Project";
import ProjectUser from "./ProjectUser";
import Role from "./Role";
import Status from "./Status";
import UserInvitation from "./UserInvitation";
import WorkspaceUser from "./WorkspaceUser";

export default interface User {
  id: string;
  firstName: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  username?: string;
  Company?: Company;
  Projects?: Project[];
  picture?: string;
  role?: Role;
  job?: string;
  status?: Status;
  icon?: any;
  iconColor?: string;
  phone?: number;
  RoleMapping?: Role;
  ProjectUsers?: ProjectUser[];
  WorkspaceUser?: WorkspaceUser;
  UserInvitations?: UserInvitation[];
}
