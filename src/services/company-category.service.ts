import { CompanyCategory } from "model";
import request from "requesters/core.request";

const companyCategoryService = {
  getCompanyCategories: async (workspaceId: string, query: any) => {
    return request.get<CompanyCategory[]>(
      `/workspaces/${workspaceId}/company-categories`,
      {
        params: query,
      }
    );
  },
  deleteCompanyCategory: async (
    workspaceId: string,
    companyCategoryId: string
  ) => {
    return request.delete(
      `/workspaces/${workspaceId}/company-categories/${companyCategoryId}`
    );
  },
  multipleCreateOrUpdate: async (workspaceId: string, data: any) => {
    return request.put(
      `/workspaces/${workspaceId}/company-categories/multiple-create-or-update`,
      data
    );
  },
};

export default companyCategoryService;
