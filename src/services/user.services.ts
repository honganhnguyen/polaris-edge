import { User } from 'model';
import request from 'requesters/user.request';

const userService = {
  getWorkspaceUsers: async (workspaceId: string, query: any) => {
    return request.get<User[]>(`/workspaces/${workspaceId}/users`, {
      params: query,
    });
  },
  getProjectUsers: async (
    workspaceId: string,
    projectId: string,
    query: any
  ) => {
    return request.get<User[]>(
      `/workspaces/${workspaceId}/projects/${projectId}/users`,
      {
        params: query,
      }
    );
  },
  inviteUsersToWorkspace: async (workspaceId: string, data: any) => {
    return request.post(`/workspaces/${workspaceId}/invite-users`, data);
  },
  inviteUsersToProject: async (workspaceId: string, projectId: string, data: any) => {
    return request.post(`/workspaces/${workspaceId}/projects/${projectId}/invite-users`, data);
  },
};

export default userService;
