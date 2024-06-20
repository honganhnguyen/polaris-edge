import Attachment from "./Attachment";

export default interface IssueAttachment {
    id?: string;
    issueId?: string;
    attachmentId?: string;
    Attachment?: Attachment;
    posX?: number | null;
    posY?: number | null;
  }
  