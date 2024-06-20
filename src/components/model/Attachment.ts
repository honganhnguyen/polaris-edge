import { AttachmentType } from "model";
import IssueAttachment from "./IssueAttachment";

export default interface Attachment {
  id: string;
  name?: string;
  code?: string;
  picture?: string;
  filePath?: string;
  width?: number;
  height?: number;
  attachmentTypeId?: string;
  AttachmentType?: AttachmentType;
  projectId?: string;
  zoneId?: string;
  IssueAttachment?: IssueAttachment;
  createdAt?: Date | string | any;
  updatedAt?: Date | string | any;
  deletedAt?: Date | string | any;
}
