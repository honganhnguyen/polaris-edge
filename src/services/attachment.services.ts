import { Attachment, Issue } from 'model';
import request from 'requesters/core.request';
import { PaginationData } from 'types';

const attachmentService = {
  createAttachment: async (
    workspaceId: string,
    projectId: string,
    data: Omit<Attachment & { issueId?: string | null }, 'id'>
  ) => {
    return request.post<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/attachments`,
      data
    );
  },
  updateAttachment: async (
    workspaceId: string,
    projectId: string,
    attachmentId: string,
    data: any
  ) => {
    return request.put<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/attachments/${attachmentId}`,
      data
    );
  },
  deleteAttachment: async (
    workspaceId: string,
    projectId: string,
    attachmentId: string
  ) => {
    return request.delete<Issue>(
      `/workspaces/${workspaceId}/projects/${projectId}/attachments/${attachmentId}`
    );
  },
  getAttachments: async (
    workspaceId: string,
    projectId: string,
    query?: any
  ) => {
    return request.get<PaginationData<Attachment>>(
      `/workspaces/${workspaceId}/projects/${projectId}/attachments`,
      {
        params: query,
      }
    );
  },
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post<{
      imageURL: string;
      fileName: string;
      width: number;
      height: number;
    }>(`${process.env.REACT_APP_BASE_CORE_API}/upload-file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default attachmentService;
