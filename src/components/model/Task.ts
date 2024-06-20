import Company from './Company';
import Status from './Status';
import User from './User';
import Priority from './Priority';
import Plan from './Plan';
import IssueType from './IssueType';
import Zone from './Zone';
import IssueStatus from './IssueStatus';
import IssueAttachment from './IssueAttachment';
import Attachment from './Attachment';

export default interface Task {
  id: string;
  name: string;
  projectId?: string;
  companyId?: string;
  Company?: Company;
  issueTypeId?: string;
  IssueType?: IssueType;
  zoneId?: string;
  Zone?: Zone;
  description?: string | null;
  reporterId?: string;
  assigneeId?: string | null;
  issuePriorityId?: string;
  IssuePriority?: Priority;
  issueStatusId?: string;
  IssueStatus?: IssueStatus;
  issueDisciplineId?: string;
  plannedStartDate?: Date | null;
  plannedEndDate?: Date | null;
  effectiveStartDate?: Date | null;
  effectiveEndDate?: Date | null;
  Attachments?: Attachment[];

  type: string;
  zoning?: string;
  company?: Company;
  user?: User;
  assignee?: string;
  priority?: Priority;
  status?: Status;
  icon?: any;
  iconColor?: string;
  image: string;
  drawing: string;
  plan?: Plan;
}
