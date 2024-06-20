import { ProjectType } from "model";
import request from "requesters/core.request";
import { PaginationData } from "types";

const projectTypeService = {
  getProjectTypes: async (workspaceId: string, query: any) => {
    return request.get<PaginationData<ProjectType>>(
      `/workspaces/${workspaceId}/project-types`,
      {
        params: query,
      }
    );
  },
  deleteProjectType: async (workspaceId: string, projectTypeId: string) => {
    return request.delete(
      `/workspaces/${workspaceId}/project-types/${projectTypeId}`
    );
  },
  multipleCreateOrUpdate: async (workspaceId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/project-types/multiple-create-or-update`,
      data
    );
  },
};

export default projectTypeService;
