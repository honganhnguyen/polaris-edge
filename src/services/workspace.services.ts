import { Company, Project, Workspace } from 'model';
import request from 'requesters/core.request';
import { QueryParams } from 'types';

const workspaceService = {
  getMyWorkspace: async (filters?: QueryParams) => {
    return request.get<Workspace>('/my-workspace', {
      params: filters,
    });
  },
  getWorkspaceUsers: async (workspaceId: string, query: any) => {
    return request.get<
      {
        id: string;
        userId: string;
        status: string;
        Company: Company;
        ProjectUsers: { id: string; Project: Project }[];
      }[]
    >(`/workspaces/${workspaceId}/users`, {
      params: query,
    });
  },
  getProjectUsers: async (workspaceId: string, projectId: string, query: any) => {
    return request.get<
      {
        id: string;
        userId: string;
        status: string;
        Company: Company;
        ProjectUsers: { id: string; Project: Project }[];
      }[]
    >(`/workspaces/${workspaceId}/projects/${projectId}/users`, {
      params: query,
    });
  },
  getWorkspaceById: async (workspaceId: string, filters?: QueryParams) => {
    return request.get<Workspace>(`/workspaces/${workspaceId}`, {
      params: filters,
    });
  },

  updateWorkspaceById: async (workspaceId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}`,
      data
    );
  },
  updateWorkspaceSettings: async (workspaceId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/workspace-settings/multiple-create-or-update`,
      data
    );
  },
};

export default workspaceService;
