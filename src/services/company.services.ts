import { Company } from 'model';
import request from 'requesters/core.request';
import { PaginationData } from 'types';

const companyService = {
  getCompanies: async (workspaceId: string, query: any) => {
    return request.get<PaginationData<Company>>(
      `/workspaces/${workspaceId}/companies`,
      {
        params: query,
      }
    );
  },
  createCompany: async (workspaceId: string, data: any) => {
    return request.post(`/workspaces/${workspaceId}/companies`, data);
  },
  updateCompany: async (workspaceId: string, companyId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/companies/${companyId}`,
      data
    );
  },
  getProjectCompanies: async (
    workspaceId: string,
    projectId: string,
    query: any
  ) => {
    return request.get<PaginationData<Company>>(
      `/workspaces/${workspaceId}/projects/${projectId}/companies`,
      {
        params: query,
      }
    );
  },
  addCompaniesToProject: async (
    workspaceId: string,
    projectId: string,
    data: { companyId: string; role: string }[]
  ) => {
    return request.post<PaginationData<Company>>(
      `/workspaces/${workspaceId}/projects/${projectId}/register-companies`,
      data
    );
  },
  deleteCompanies: async (workspaceId: string, companyId: string) => {
    return request.delete<PaginationData<Company>>(
      `/workspaces/${workspaceId}/companies/${companyId}`
    );
  },
};

export default companyService;
