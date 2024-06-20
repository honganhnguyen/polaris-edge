import { Role } from 'model';
import request from 'requesters/user.request';
import { PaginationData } from 'types';

const roleService = {
  getRoles: async (query: any) => {
    return request.get<PaginationData<Role>>(
      `/roles`,
      {
        params: query,
      }
    );
  },
};

export default roleService;
