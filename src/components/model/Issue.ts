import Attachment from "./Attachment";
import Company from "./Company";
import IssueAttachment from "./IssueAttachment";
import IssueDiscipline from "./IssueDiscipline";
import IssuePriority from "./IssuePriority";
import IssueStatus from "./IssueStatus";
import Zone from "./Zone";

export default interface Issue {
  id: string;
  name: string;
  projectId: string;
  companyId: string;
  issueTypeId: string;
  zoneId: string;
  description?: string;
  reporterId: string;
  assigneeId: string;
  issuePriorityId: string;
  issueStatusId: string;
  issueDisciplineId: string;
  plannedStartDate?:  string | Date | any;
  plannedEndDate?:  string | Date | any;
  effectiveStartDate?:  string | Date | any;
  effectiveEndDate?:  string | Date | any;

  Company?: Company;
  Zone?: Zone;
  IssuePriority?: IssuePriority;
  IssueStatus: IssueStatus;
  IssueDiscipline?: IssueDiscipline;
  Attachments?: Attachment[];
  
  Plans?: Attachment[];
  Photos?: any;
  createdAt?:  string | Date | any;
  updatedAt?:  string | Date | any;
  deletedAt?:  string | Date | any;
}
