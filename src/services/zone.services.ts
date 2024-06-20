import Zone from 'model/Zone';
import request from 'requesters/core.request';
import { PaginationData} from 'types';

const zoneService = {
  getProjectZones: async (
    workspaceId: string,
    projectId: string,
    query: any
  ) => {
    return request.get<PaginationData<Zone>>(
      `/workspaces/${workspaceId}/projects/${projectId}/zones`,
      {
        params: query,
      }
    );
  },
  createZone: async (
    workspaceId: string,
    projectId: string,
    data: { name: string, parentId?: string | null }
  ) => {
    return request.post<PaginationData<Zone>>(
      `/workspaces/${workspaceId}/projects/${projectId}/zones`,
      data
    );
  },
  updateZone: async (
    workspaceId: string,
    projectId: string,
    zoneId: string,
    data: { name: string}
  ) => {
    return request.put<PaginationData<Zone>>(
      `/workspaces/${workspaceId}/projects/${projectId}/zones/${zoneId}`,
      data
    );
  },
  multipleUpdateZone: async (
    workspaceId: string,
    projectId: string,
    data: any
  ) => {
    return request.put<PaginationData<Zone>>(
      `/workspaces/${workspaceId}/projects/${projectId}/multiple-update-zones`,
      data
    );
  },
  
  deleteZone: async (
    workspaceId: string,
    projectId: string,
    zoneId: string,
  ) => {
    return request.delete<PaginationData<Zone>>(
      `/workspaces/${workspaceId}/projects/${projectId}/zones/${zoneId}`
    );
  },
};

export default zoneService;
