import { UserStatus } from 'types';
import Company from 'model/Company';

export default interface WorkspaceUser {
  id: string;
  userId: string;
  workspaceId?: string;
  status?: UserStatus;
  Company?: Company;
  countProject?: number;
}
