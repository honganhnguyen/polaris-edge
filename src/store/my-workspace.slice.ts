import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Company, Project, User, Workspace, WorkspaceUser, CompanyCategory } from 'model';
import { Loading, QueryParams } from 'types';
import { mergeArraysByKey, sortByName } from 'utils';
import { ProjectType } from 'model';
import {
  projectTypeService,
  workspaceService,
  companyService,
  projectService,
  userService,
  companyCategoryService,
} from 'services';

interface MyWorkspaceState {
  myWorkspace: Workspace | null;
  myWorkspaceLoading: Loading;
  users: User[];
  usersLoading: Loading;
  projects: Project[];
  projectsLoading: Loading;
  companies: Company[];
  companiesLoading: Loading;
  projectTypes: ProjectType[];
  projectTypesLoading: Loading;
  companyCategories: CompanyCategory[];
  companyCategoriesLoading: Loading;
}

const name = 'my-workspace';
const initialState: MyWorkspaceState = {
  myWorkspace: null,
  myWorkspaceLoading: 'idle',
  users: [],
  usersLoading: 'idle',
  projects: [],
  projectsLoading: 'idle',
  companies: [],
  companiesLoading: 'idle',
  projectTypes: [],
  projectTypesLoading: 'idle',
  companyCategories: [],
  companyCategoriesLoading: 'idle',
};

export const fetchUsers = createAsyncThunk(
  `${name}/list-of-users-in-my-workspace`,
  async (query: QueryParams & { workspaceId: string }, { rejectWithValue }) => {
    const { workspaceId, ...params } = query;
    try {
      const [workspaceUsers, users] = await Promise.all([
        workspaceService.getWorkspaceUsers(workspaceId, params),
        userService.getWorkspaceUsers(workspaceId, params),
      ]);
      users.forEach((user, index) => {
        delete users[index].status;
      });
      const response = sortByName(
        mergeArraysByKey(workspaceUsers, users),
        'firstName'
      ) as (WorkspaceUser & User)[];
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  `${name}/list-of-projects-in-my-workspace`,
  async (query: QueryParams, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const workspace = state.myWorkspace.myWorkspace;
    try {
      const response = await projectService.getProjects(
        workspace?.id as string,
        query
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  `${name}/list-of-companies-in-my-workspace`,
  async (query: QueryParams & { workspaceId: string }, { rejectWithValue }) => {
    const { workspaceId, ...params } = query;
    try {
      const response = await companyService.getCompanies(workspaceId, params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectTypes = createAsyncThunk(
  `${name}/list-of-project-types-in-my-workspace`,
  async (query: QueryParams & { workspaceId: string }, { rejectWithValue }) => {
    const { workspaceId, ...params } = query;
    try {
      const response = await projectTypeService.getProjectTypes(
        workspaceId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCompanyCategories = createAsyncThunk(
  `${name}/list-of-company-categories-in-my-workspace`,
  async (query: QueryParams & { workspaceId: string }, { rejectWithValue }) => {
    const { workspaceId, ...params } = query;
    try {
      const response = await companyCategoryService.getCompanyCategories(
        workspaceId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMyWorkspace = createAsyncThunk(
  `${name}/list-of-workspace-settings-in-my-workspace`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const response = await workspaceService.getMyWorkspace({
        include: 'WorkspaceSettings'
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const myWorkspaceSlice = createSlice({
  name,
  initialState,
  reducers: {
    initMyWorkspace: (state, action) => {
      state.myWorkspace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoading = 'idle';
      });
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.projectsLoading = 'pending';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectsLoading = 'idle';
        state.projects = action.payload.rows;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.projectsLoading = 'idle';
      });
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.companiesLoading = 'pending';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companiesLoading = 'idle';
        state.companies = action.payload.rows;
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.companiesLoading = 'idle';
      });
    builder
      .addCase(fetchProjectTypes.pending, (state) => {
        state.projectTypesLoading = 'pending';
      })
      .addCase(fetchProjectTypes.fulfilled, (state, action) => {
        state.projectTypesLoading = 'idle';
        state.projectTypes = action.payload.rows;
      })
      .addCase(fetchProjectTypes.rejected, (state) => {
        state.projectTypesLoading = 'idle';
      });
    builder
      .addCase(fetchCompanyCategories.pending, (state) => {
        state.companyCategoriesLoading = 'pending';
      })
      .addCase(fetchCompanyCategories.fulfilled, (state, action) => {
        state.companyCategoriesLoading = 'idle';
        state.companyCategories = action.payload;
      })
      .addCase(fetchCompanyCategories.rejected, (state) => {
        state.companyCategoriesLoading = 'idle';
      });
    builder
      .addCase(fetchMyWorkspace.pending, (state) => {
        state.myWorkspaceLoading = 'pending';
      })
      .addCase(fetchMyWorkspace.fulfilled, (state, action) => {
        state.myWorkspaceLoading = 'idle';
        state.myWorkspace = action.payload;
      })
      .addCase(fetchMyWorkspace.rejected, (state) => {
        state.myWorkspaceLoading = 'idle';
      });
  },
});

export const selectMyWorkspaceUsers = (state: RootState) =>
  state.myWorkspace.users;
export const selectMyWorkspaceUsersLoading = (state: RootState) =>
  state.myWorkspace.usersLoading;

export const selectMyWorkspaceProjects = (state: RootState) =>
  state.myWorkspace.projects;
export const selectMyWorkspaceProjectsLoading = (state: RootState) =>
  state.myWorkspace.projectsLoading;

export const selectMyWorkspaceCompanies = (state: RootState) =>
  state.myWorkspace.companies;
export const selectMyWorkspaceCompaniesLoading = (state: RootState) =>
  state.myWorkspace.companiesLoading;

export const selectMyWorkspaceProjectTypes = (state: RootState) =>
  state.myWorkspace.projectTypes;
export const selectMyWorkspaceProjectTypesLoading = (state: RootState) =>
  state.myWorkspace.projectTypesLoading;
export const selectMyWorkspaceCompanyCategories = (state: RootState) =>
  state.myWorkspace.companyCategories;
export const selectMyWorkspaceCompanyCategoriesLoading = (state: RootState) =>
  state.myWorkspace.companyCategoriesLoading;
export const selectMyWorkspace = (state: RootState) =>
  state.myWorkspace.myWorkspace;

export const selectMyWorkspaceLoading = (state: RootState) =>
  state.myWorkspace.myWorkspaceLoading;
export const { initMyWorkspace } = myWorkspaceSlice.actions;

export default myWorkspaceSlice.reducer;
