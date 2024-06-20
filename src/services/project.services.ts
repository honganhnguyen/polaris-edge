import { Project } from 'model';
import request from 'requesters/core.request';
import { PaginationData } from 'types';

const projectService = {
  getProjects: async (workspaceId: string, query: any) => {
    return request.get<PaginationData<Project>>(
      `/workspaces/${workspaceId}/projects`,
      {
        params: query,
      }
    );
  },
  getProjectById: async (
    workspaceId: string,
    projectId: string,
    query: any
  ) => {
    return request.get<Project>(
      `/workspaces/${workspaceId}/projects/${projectId}`,
      {
        params: query,
      }
    );
  },
  getOtherProjects: async (query: any) => {
    return request.get<PaginationData<Project>>('/other-projects', {
      params: query,
    });
  },
  getFavoriteProjects: async (query: any) => {
    return request.get<PaginationData<Project>>('/favorite-projects', {
      params: query,
    });
  },
  createProject: async (workspaceId: string, data: any) => {
    return request.post<{ projectId: string }>(
      `/workspaces/${workspaceId}/projects`,
      data
    );
  },
  updateProject: async (workspaceId: string, projectId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/projects/${projectId}`,
      data
    );
  },
  markProjectAsFavorite: async (workspaceId: string, projectId: string) => {
    return request.post<Project>(
      `/workspaces/${workspaceId}/projects/${projectId}/favorite`
    );
  },

  unmarkProjectAsFavorite: async (workspaceId: string, projectId: string) => {
    return request.delete<Project>(
      `/workspaces/${workspaceId}/projects/${projectId}/favorite`
    );
  },
};

export default projectService;
