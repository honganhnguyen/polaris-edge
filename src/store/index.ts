import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import myWorkspaceSlices from 'store/my-workspace.slice';
import roleSlice from 'store/role.slice';
import myProjectsSlice from 'store/my-projects.slice';
import otherWorkspacesSlice from 'store/other-workspaces.slice';
import commonSlice from 'store/common.slice';

const store = configureStore({
  reducer: {
    myWorkspace: myWorkspaceSlices,
    myProjects: myProjectsSlice,
    role: roleSlice,
    otherWorkspaces: otherWorkspacesSlice,
    common: commonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
