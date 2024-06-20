export default interface Phase {
    id: string;
    name: string;
    code: string;
    description?: string;
    order?: number;
    isCustom?: boolean;
    userCreated?: string;
    projectCreated?: string;
    createdAt?:  string | Date | any;
    updatedAt?:  string | Date | any;
    deletedAt?:  string | Date | any;
}