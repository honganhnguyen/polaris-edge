import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  Company,
  Project,
  User,
  WorkspaceUser,
  Zone,
  Issue,
  Phase,
} from 'model';
import { Loading, QueryParams } from 'types';
import { mergeArraysByKey, sortByName } from 'utils';
import { ProjectType } from 'model';
import {
  workspaceService,
  userService,
  companyService,
  projectService,
  zoneService,
  attachmentService,
  phaseService,
} from 'services';
import issueService from 'services/issue.services';

interface MyProjectsState {
  selectedProjectId: string | null;
  selectedProject: Project | null;
  projects: {
    [projectId: string]: {
      projectData: Project | null;
      projectDataLoading: Loading;
      users: User[];
      usersLoading: Loading;
      companies: Company[];
      companiesLoading: Loading;
      zones: Zone[];
      zonesLoading: Loading;
      projectTypes: ProjectType[];
      projectTypesLoading: Loading;
      attachments: ProjectType[];
      attachmentsLoading: Loading;
      phases: Phase[];
      phasesLoading: Loading;
      modules: {
        [module: string]: {
          issues: Issue[];
          issuesLoading: Loading;
          issueKpis: {
            kpiData: {
              draft: number;
              open: number;
              closed: number;
              readyForInspection: number;
              readyForInspectionOverdue: number;
              openOverdue: number;
            };
          };
          issueKpisLoading: Loading;
        };
      };
    };
  };
}

const name = 'my-project';
const initialState: MyProjectsState = {
  selectedProjectId: null,
  selectedProject: null,
  projects: {},
};

export const fetchProjectUsers = createAsyncThunk(
  `${name}/list-of-users-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const [workspaceUsers, users] = await Promise.all([
        workspaceService.getProjectUsers(workspaceId, projectId, params),
        userService.getProjectUsers(workspaceId, projectId, params),
      ]);
      users.forEach((user, index) => {
        delete users[index].status;
      });
      const updatedWorkspaceUsers = workspaceUsers.map((user) => ({
        ...user,
        id: user.userId,
      }));
      const response = sortByName(
        mergeArraysByKey(updatedWorkspaceUsers, users),
        'firstName'
      ) as (WorkspaceUser & User)[];
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectCompanies = createAsyncThunk(
  `${name}/list-of-companies-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await companyService.getProjectCompanies(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchProjectZones = createAsyncThunk(
  `${name}/list-of-zones-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await zoneService.getProjectZones(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectAttachments = createAsyncThunk(
  `${name}/list-of-attachments-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await attachmentService.getAttachments(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  `${name}/get-project-byid-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      if (!projectId) return null;
      const response = await projectService.getProjectById(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectIssues = createAsyncThunk(
  `${name}/list-of-issues-in-my-project`,
  async (
    query: QueryParams & {
      workspaceId: string;
      projectId: string;
      module: string;
    },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await issueService.getAllIssues(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectIssueKpis = createAsyncThunk(
  `${name}/list-of-issue-kpis-in-my-project`,
  async (
    query: QueryParams & {
      workspaceId: string;
      projectId: string;
      module: string;
    },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await issueService.getIssueKpis(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectPhases = createAsyncThunk(
  `${name}/list-of-phases-in-my-project`,
  async (
    query: QueryParams & { workspaceId: string; projectId: string },
    { rejectWithValue }
  ) => {
    const { workspaceId, projectId, ...params } = query;
    try {
      const response = await phaseService.getProjectPhases(
        workspaceId,
        projectId,
        params
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const setProjectState = (
  state: any,
  action: any,
  field: string,
  value: any
) => {
  const { projectId } = action.meta.arg;
  state.projects[projectId] = {
    ...(state.projects[projectId] ?? {}),
    [field]: value,
  };
};

const setModuleState = (state: any, action: any, field: string, value: any) => {
  const { projectId, module } = action.meta.arg;
  state.projects[projectId] = {
    ...(state.projects[projectId] ?? {}),
    modules: {
      ...(state.projects?.[projectId]?.modules ?? {}),
      [module]: {
        ...(state.projects?.[projectId]?.modules?.[module] ?? {}),
        [field]: value,
      },
    },
  };
};

export const myProjectsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectUsers.pending, (state, action) =>
        setProjectState(state, action, 'usersLoading', 'pending')
      )
      .addCase(fetchProjectUsers.fulfilled, (state, action) => {
        setProjectState(state, action, 'usersLoading', 'idle');
        setProjectState(state, action, 'users', action.payload);
      })
      .addCase(fetchProjectUsers.rejected, (state, action) =>
        setProjectState(state, action, 'usersLoading', 'idle')
      );
    builder
      .addCase(fetchProjectCompanies.pending, (state, action) =>
        setProjectState(state, action, 'companiesLoading', 'pending')
      )
      .addCase(fetchProjectCompanies.fulfilled, (state, action) => {
        setProjectState(state, action, 'companiesLoading', 'idle');
        setProjectState(state, action, 'companies', action.payload.rows);
      })
      .addCase(fetchProjectCompanies.rejected, (state, action) =>
        setProjectState(state, action, 'companiesLoading', 'idle')
      );
    builder
      .addCase(fetchProjectById.pending, (state, action) =>
        setProjectState(state, action, 'projectDataLoading', 'pending')
      )
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        setProjectState(state, action, 'projectDataLoading', 'idle');
        setProjectState(state, action, 'projectData', action.payload);
      })
      .addCase(fetchProjectById.rejected, (state, action) =>
        setProjectState(state, action, 'projectDataLoading', 'idle')
      );
    builder
      .addCase(fetchProjectZones.pending, (state, action) =>
        setProjectState(state, action, 'zonesLoading', 'pending')
      )
      .addCase(fetchProjectZones.fulfilled, (state, action) => {
        setProjectState(state, action, 'zonesLoading', 'idle');
        setProjectState(state, action, 'zones', action.payload.rows);
      })
      .addCase(fetchProjectZones.rejected, (state, action) =>
        setProjectState(state, action, 'zonesLoading', 'idle')
      );
    builder
      .addCase(fetchProjectPhases.pending, (state, action) => {
        setProjectState(state, action, 'phasesLoading', 'pending');
      })
      .addCase(fetchProjectPhases.fulfilled, (state, action) => {
        setProjectState(state, action, 'phasesLoading', 'idle');
        setProjectState(state, action, 'phases', action.payload.rows);
      })
      .addCase(fetchProjectPhases.rejected, (state, action) =>
        setProjectState(state, action, 'phasesLoading', 'idle')
      );
    builder
      .addCase(fetchProjectAttachments.pending, (state, action) =>
        setProjectState(state, action, 'attachmentsLoading', 'pending')
      )
      .addCase(fetchProjectAttachments.fulfilled, (state, action) => {
        setProjectState(state, action, 'attachmentsLoading', 'idle');
        setProjectState(state, action, 'attachments', action.payload.rows);
      })
      .addCase(fetchProjectAttachments.rejected, (state, action) =>
        setProjectState(state, action, 'attachmentsLoading', 'idle')
      );
    builder
      .addCase(fetchProjectIssues.pending, (state, action) => {
        setModuleState(state, action, 'issuesLoading', 'pending');
      })
      .addCase(fetchProjectIssues.fulfilled, (state, action) => {
        setModuleState(state, action, 'issuesLoading', 'idle');
        setModuleState(state, action, 'issues', action.payload.rows);
      })
      .addCase(fetchProjectIssues.rejected, (state, action) =>
        setModuleState(state, action, 'issuesLoading', 'idle')
      );
    builder
      .addCase(fetchProjectIssueKpis.pending, (state, action) => {
        setModuleState(state, action, 'issueKpisLoading', 'pending');
      })
      .addCase(fetchProjectIssueKpis.fulfilled, (state, action) => {
        setModuleState(state, action, 'issueKpisLoading', 'idle');
        setModuleState(state, action, 'issueKpis', action.payload);
      })
      .addCase(fetchProjectIssueKpis.rejected, (state, action) =>
        setModuleState(state, action, 'issueKpisLoading', 'idle')
      );
  },
});

export const selectSelectedProjectId = (state: RootState) =>
  state.myProjects.selectedProjectId;
export const selectSelectedProject = (state: RootState) =>
  state.myProjects.selectedProject;

export const { setSelectedProject, setSelectedProjectId } =
  myProjectsSlice.actions;

export default myProjectsSlice.reducer;
