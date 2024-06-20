export default interface IssueMessage {
    id: string;
    issueId: string;
    userCreated: string;
    message: string;
    createdAt?:  string | Date | any;
    updatedAt?:  string | Date | any;
    deletedAt?:  string | Date | any;
}