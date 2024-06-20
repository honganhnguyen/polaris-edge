import { IssueMessage } from "model";
import request from "requesters/core.request";
import { PaginationData } from "types";

const issueMessageService = {
  createIssueMessage: async (workspaceId: string, projectId: string, data: any) => {
    return request.post<IssueMessage>(
      `/workspaces/${workspaceId}/projects/${projectId}/issue-messages`,
      data
    );
  },
  
};

export default issueMessageService;
