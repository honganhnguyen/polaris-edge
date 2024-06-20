import { Task } from 'model';
import request from 'requesters/core.request';
import { PaginationData } from 'types';
const taskService = {
  getAllTasks: async (workspaceId: string, projectId: string, query: any) => {
    return request.get<PaginationData<Task>>(
      `/workspaces/${workspaceId}/projects/${projectId}/issues`,
      {
        params: query,
      }
    );
  },
  updateTask: async (workspaceId: string, projectId: string, taskId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/projects/${projectId}/issues/${taskId}`,
      data
    );
  },
};
export default taskService;
