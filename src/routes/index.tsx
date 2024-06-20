import { lazy, Suspense } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { AppRouteType } from "types";
import { AnimatePresence } from "framer-motion";
import {
  Layout,
  BasicLayout,
  WorkspaceSettingLayout,
  ProjectSettingLayout,
} from "components";
import useAuthContext from "store/auth-context";

const NotFound = lazy(() => import("pages/404"));
const Home = lazy(() => import("pages/Home/Home"));
const Modules = lazy(() => import("pages/Modules/Modules"));
const MyTasks = lazy(() => import("pages/MyTasks/MyTasks"));
const GeneralSettings = lazy(
  () => import("pages/WorkspaceSettings/GeneralSettings")
);
const UserSettings = lazy(() => import("pages/WorkspaceSettings/UserSettings"));
const CompanySettings = lazy(
  () => import("pages/WorkspaceSettings/CompanySettings")
);
const Auth = lazy(() => import("pages/Auth/Auth"));
const ForgotPassword = lazy(
  () => import("pages/ForgotPassword/ForgotPassword")
);
const UpdatePassword = lazy(
  () => import("pages/UpdatePassword/UpdatePassword")
);
const ProjectsGeneral = lazy(
  () => import("pages/ProjectSettings/ProjectsGeneral")
);
const DataCustomization = lazy(
  () => import("pages/WorkspaceSettings/DataCustomization")
);
const ProjectSettings = lazy(
  () => import("pages/ProjectSettings/ProjectSettings")
);
const ProjectUserSettings = lazy(
  () => import("pages/ProjectSettings/ProjectUserSettings")
);
const ProjectCompanySettings = lazy(
  () => import("pages/ProjectSettings/ProjectCompanySettings")
);
const ProjectPhotos = lazy(() => import("pages/ProjectSettings/ProjectPhotos"));

const ProjectQuality = lazy(
  () => import("pages/ProjectSettings/ProjectQuality")
);
const ProjectZoning = lazy(() => import("pages/ProjectSettings/ProjectZoning"));
const ProjectInspections = lazy(
  () => import("pages/ProjectSettings/ProjectInspections")
);
const ProjectAnalytics = lazy(
  () => import("pages/ProjectSettings/ProjectAnalytics")
);
const DirectoryGeneral = lazy(() => import("pages/Directory/DirectoryGeneral"));

const waitFor = (Tag: React.LazyExoticComponent<() => JSX.Element | null>) => (
  <Suspense fallback={null}>
    <Tag />
  </Suspense>
);

export const routes: AppRouteType[] = [
  {
    name: "Auth",
    auth: false,
    path: "/auth",
    parentPath: "/auth",
    component: Auth,
    isPublic: true,
    showMenu: false,
    showHeader: false,
  },
  {
    name: "ForgotPassword",
    auth: false,
    parentPath: "/auth",
    path: "/auth/forgot-password",
    component: ForgotPassword,
    isPublic: true,
    showMenu: false,
    showHeader: false,
  },
  {
    name: "UpdatePassword",
    auth: false,
    parentPath: "/auth",
    path: "/auth/update-password",
    component: UpdatePassword,
    isPublic: true,
    showMenu: false,
    showHeader: false,
  },
  {
    name: "Projects",
    auth: true,
    path: "/",
    parentPath: "/",
    component: Home,
    isPublic: true,
    showMenu: false,
    showHeader: true,
  },
  {
    name: "Modules",
    auth: true,
    path: "/modules",
    parentPath: "/modules",
    component: Modules,
    isPublic: true,
    showMenu: false,
    showHeader: true,
  },
  {
    name: "My Tasks",
    auth: true,
    path: "/my-tasks",
    parentPath: "/my-tasks",
    component: MyTasks,
    isPublic: true,
    showMenu: false,
    showHeader: true,
  },
  {
    name: "General settings",
    auth: true,
    parentPath: "/workspace-settings",
    path: "/workspace-settings/general",
    component: GeneralSettings,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "workspace-settings",
  },
  {
    name: "General settings",
    auth: true,
    parentPath: "/workspace-settings",
    path: "/workspace-settings/users",
    component: UserSettings,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "workspace-settings",
  },
  {
    name: "Company Settings",
    auth: true,
    parentPath: "/workspace-settings",
    path: "/workspace-settings/companies",
    component: CompanySettings,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "workspace-settings",
  },
  {
    name: "Data Customization",
    auth: true,
    parentPath: "/workspace-settings",
    path: "/workspace-settings/data-customization",
    component: DataCustomization,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "workspace-settings",
  },
  {
    name: "Project General",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/general",
    component: ProjectsGeneral,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Settings",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/settings",
    component: ProjectSettings,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "Users",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/users",
    component: ProjectUserSettings,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Quality",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/quality",
    component: ProjectQuality,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Zoning",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/quality/zoning",
    component: ProjectZoning,
    isPublic: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Inspections",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/quality/inspections",
    component: ProjectInspections,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Analytics",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/quality/analytics",
    component: ProjectAnalytics,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Safety",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/safety",
    component: ProjectQuality,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Zoning",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/safety/zoning",
    component: ProjectZoning,
    isPublic: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Inspections",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/safety/inspections",
    component: ProjectInspections,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Analytics",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/safety/analytics",
    component: ProjectAnalytics,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Zoning",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/zoning",
    component: ProjectZoning,
    isPublic: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Company Settings",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/companies",
    component: ProjectCompanySettings,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Project Photos",
    auth: true,
    parentPath: "/project-settings",
    path: "/project-settings/:projectId/photos",
    component: ProjectPhotos,
    isPublic: true,
    sidebar: "project-settings",
  },
  {
    name: "Directory",
    auth: true,
    parentPath: "/toolbox",
    path: "/toolbox/:projectId/directory",
    component: DirectoryGeneral,
    isPublic: true,
    showMenu: true,
    showHeader: true,
    sidebar: "project-settings",
  },
  {
    name: "404",
    path: "*",
    component: NotFound,
    isPublic: true,
  },
];

export default function RoutesAppRoutes() {
  const { profile } = useAuthContext();
  const location = useLocation();

  const publicRoutes = routes
    .filter((route) => !route.auth || route.isPublic)
    .map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={waitFor(route.component)}
      />
    ));

  // public routes
  if (!profile) {
    return (
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          {publicRoutes}
        </Routes>
      </AnimatePresence>
    );
  }

  // authenticated routes
  const authenticatedRoutes = routes
    .filter((route) => route.auth || route.isPublic)
    .map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={waitFor(route.component)}
      />
    ));

  const currentRoute = routes.find((route) =>
    matchPath(route.path, location.pathname) ? true : false
  );

  const RouterLayout = !currentRoute?.sidebar
    ? BasicLayout
    : currentRoute?.sidebar === "workspace-settings"
    ? WorkspaceSettingLayout
    : ProjectSettingLayout;
  console.log();
  return (
    <Layout
      showHeader={currentRoute?.showHeader ?? true}
      sidebar={currentRoute?.sidebar}
    >
      <RouterLayout>
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            {authenticatedRoutes}
          </Routes>
        </AnimatePresence>
      </RouterLayout>
    </Layout>
  );
}
