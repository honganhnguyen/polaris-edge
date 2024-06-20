import { Attachment } from "model";
import request from "requesters/core.request";
import { PaginationData } from "types";

const attachmentService = {
  getAttachments: async (
    workspaceId: string,
    projectId: string,
    query: any
  ) => {
    return request.get<PaginationData<Attachment>>(
      `/workspaces/${workspaceId}/projects/${projectId}/attachments`,
      {
        params: query,
      }
    );
  },
};

export default attachmentService;
