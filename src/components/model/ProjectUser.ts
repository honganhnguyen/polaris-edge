import { UserStatus } from 'types';
import Project from './Project';

export default interface ProjectUser {
  id: string;
  userId: string;
  projectId?: string;
  status?: UserStatus;
  isFavorite?: boolean;
  Project?: Project;
}
