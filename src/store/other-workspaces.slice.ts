import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Project } from 'model';
import { Loading, QueryParams } from 'types';
import { projectService } from 'services';

interface OtherWorkspacesState {
  projects: Project[];
  projectsLoading: Loading;
  favoriteProjects: Project[];
  favoriteProjectsLoading: Loading;
}

const name = 'other-workspaces';
const initialState: OtherWorkspacesState = {
  projects: [],
  projectsLoading: 'idle',
  favoriteProjects: [],
  favoriteProjectsLoading: 'idle',
};

export const fetchOtherProjects = createAsyncThunk(
  `${name}/list-of-projects-in-other-workspaces`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const response = await projectService.getOtherProjects(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFavoriteProjects = createAsyncThunk(
  `${name}/list-of-favorite-projects-in-other-workspaces`,
  async (query: QueryParams, { rejectWithValue }) => {
    try {
      const response = await projectService.getFavoriteProjects(query);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const otherWorkspacesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherProjects.pending, (state) => {
        state.projectsLoading = 'pending';
      })
      .addCase(fetchOtherProjects.fulfilled, (state, action) => {
        state.projectsLoading = 'idle';
        state.projects = action.payload.rows;
      })
      .addCase(fetchOtherProjects.rejected, (state) => {
        state.projectsLoading = 'idle';
      });
    builder
      .addCase(fetchFavoriteProjects.pending, (state) => {
        state.favoriteProjectsLoading = 'pending';
      })
      .addCase(fetchFavoriteProjects.fulfilled, (state, action) => {
        state.favoriteProjectsLoading = 'idle';
        state.favoriteProjects = action.payload.rows;
      })
      .addCase(fetchFavoriteProjects.rejected, (state) => {
        state.favoriteProjectsLoading = 'idle';
      });
  },
});

export const selectOtherWorkspacesProjects = (state: RootState) =>
  state.otherWorkspaces.projects;
export const selectOtherWorkspacesProjectsLoading = (state: RootState) =>
  state.otherWorkspaces.projectsLoading;

export const selectFavoriteProjects = (state: RootState) =>
  state.otherWorkspaces.favoriteProjects;
export const selectFavoriteProjectsLoading = (state: RootState) =>
  state.otherWorkspaces.favoriteProjectsLoading;

export default otherWorkspacesSlice.reducer;
