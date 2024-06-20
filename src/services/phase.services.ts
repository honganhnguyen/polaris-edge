import { Phase } from "model";
import request from "requesters/core.request";
import { PaginationData } from "types";

const phaseService = {
    getProjectPhases: async (workspaceId: string, projectId: string, query: any) => {
        return request.get<PaginationData<Phase>>(
          `/workspaces/${workspaceId}/projects/${projectId}/phases`,
          {
            params: query,
          }
        );
      },
}

export default phaseService;