import Country from './Country';
import ProjectType from './ProjectType';
import ProjectUser from './ProjectUser';
import Workspace from './Workspace';

export default interface Project {
  id: string;
  workspaceId: string;
  Workspace?: Workspace;
  name: string;
  code: string;
  address?: string;
  city?: string;
  countryId?: string;
  country?: Country;
  plannedStartDate?: string | Date | any;
  plannedEndDate?: string | Date | any;
  effectiveStartDate?: string | Date;
  effectiveEndDate?: string | Date;
  logoPath?: string;
  coverPath?: string;
  status?: string;
  icon?: any;
  iconColor?: string;
  projectTypeId?: string;
  ProjectType?: ProjectType;
  ProjectUser?: ProjectUser;
  ProjectUsers?: ProjectUser[];
}
