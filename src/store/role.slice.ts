import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Role } from 'model';
import { Loading, QueryParams } from 'types';
import { roleService } from 'services';

interface MyWorkspaceState {
  workspaceRoles: Role[];
  workspaceRolesLoading: Loading;
  projectRoles: Role[];
  projectRolesLoading: Loading;
}

const name = 'role';
const initialState: MyWorkspaceState = {
  workspaceRoles: [],
  workspaceRolesLoading: 'idle',
  projectRoles: [],
  projectRolesLoading: 'idle',
};

export const fetchWorkspaceRoles = createAsyncThunk(
  `${name}/list-of-workspace-roles`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const response = await roleService.getRoles(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectRoles = createAsyncThunk(
  `${name}/list-of-project-roles`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const response = await roleService.getRoles(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const roleSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceRoles.pending, (state) => {
        state.workspaceRolesLoading = 'pending';
      })
      .addCase(fetchWorkspaceRoles.fulfilled, (state, action) => {
        state.workspaceRolesLoading = 'idle';
        state.workspaceRoles = action.payload.rows;
      })
      .addCase(fetchWorkspaceRoles.rejected, (state) => {
        state.workspaceRolesLoading = 'idle';
      });
    builder
      .addCase(fetchProjectRoles.pending, (state) => {
        state.projectRolesLoading = 'pending';
      })
      .addCase(fetchProjectRoles.fulfilled, (state, action) => {
        state.projectRolesLoading = 'idle';
        state.projectRoles = action.payload.rows;
      })
      .addCase(fetchProjectRoles.rejected, (state) => {
        state.projectRolesLoading = 'idle';
      });
  },
});

export const selectWorkspaceRoles = (state: RootState) =>
  state.role.workspaceRoles;
export const selectWorkspaceRolesLoading = (state: RootState) =>
  state.role.workspaceRolesLoading;

export const selectProjectRoles = (state: RootState) => state.role.projectRoles;
export const selectProjectRolesLoading = (state: RootState) =>
  state.role.projectRolesLoading;

export default roleSlice.reducer;
