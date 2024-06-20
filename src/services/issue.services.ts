import { Issue } from "model";
import request from "requesters/core.request";
import { PaginationData } from "types";

const issueService = {
  createIssue: async (workspaceId: string, projectId: string, data: any) => {
    return request.post<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/issues`,
      data
    );
  },
  updateIssue: async (
    workspaceId: string,
    projectId: string,
    issueId: string,
    data: any
  ) => {
    return request.put<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
      data
    );
  },
  getIssueById: async (
    workspaceId: string,
    projectId: string,
    issueId: string,
    query?: any
  ) => {
    return request.get<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`,
      {
        params: query,
      }
    );
  },
  deleteIssueById: async (
    workspaceId: string,
    projectId: string,
    issueId: string
  ) => {
    return request.delete(
      `/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`
    );
  },

  getAllIssues: async (workspaceId: string, projectId: string, query: any) => {
    return request.get<PaginationData<Issue>>(
      `/workspaces/${workspaceId}/projects/${projectId}/issues`,
      {
        params: query,
      }
    );
  },
  getIssueKpis: async (workspaceId: string, projectId: string, query: any) => {
    return request.get<{
      kpiData: {
        draft: number;
        open: number;
        closed: number;
        readyForInspection: number;
        readyForInspectionOverdue: number;
        openOverdue: number;
      };
    }>(`/workspaces/${workspaceId}/projects/${projectId}/issues/kpis`, {
      params: query,
    });
  },
};

export default issueService;
