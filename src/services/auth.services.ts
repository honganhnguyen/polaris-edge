import { User } from 'model';
import UserInvitation from 'model/UserInvitation';
import request from 'requesters/user.request';

const authService = {
  checkEmailIsExist: async (email: string) => {
    return request.post<{ isExist: boolean }>('/check-email', { email });
  },
  verifyInvitationToken: async (token: string) => {
    return request.get<UserInvitation>('/check-invitation', { params: { token} });
  },
  signUpWithPassword: async (values: any) => {
    return request.post<{ registerUserOutput: { token: string } & any }>(
      '/register',
      values
    );
  },
  signInWithPassword: async (values: { email: string; password: string }) => {
    return request.post<{ token: string; user: User }>('/login', values);
  },
  profile: async () => {
    return request.get<User>('/profile');
  },
  signOut: async () => {
    return request.post('/logout');
  },
  googleLogin: async (values: { token: string }) => {
    return await request.post<{
      isExist: boolean;
      email?: string;
      user?: User;
      token?: string;
    }>("/google-auth/callback", values);
  },
  googleRegister: async (values: { token: string, data: User }) => {
    return await request.post<{ registerUserOutput: { token: string } & any }>(
      '/google-auth/register',
      { token: values.token, ...values.data }
    );
  },
  microsoftLogin: async (values: { token: string }) => {
    return await request.post<{
      isExist: boolean;
      email?: string;
      user?: User;
      token?: string;
    }>("/microsoft-auth/callback", values);
  },
  microsoftRegister: async (values: { token: string, data: User }) => {
    return await request.post<{ registerUserOutput: { token: string } & any }>(
      '/microsoft-auth/register',
      { token: values.token, ...values.data }
    );
  },
};

export default authService;
