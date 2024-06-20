import User from './User';

export default interface UserInvitation {
  id: string;
  userId: string;
  workspaceId: string;
  token: string;
  expiredTime?: string;
  senderId?: string;
  status: string;
  User?: User;
  Sender?: User;
}
