import Project from "./Project";
import WorkspaceSettings from "./WorkspaceSettings";

export default interface Workspace {
  id: string;
  name: string;
  code: string;
  Projects?: Project[];
  logoPath?: string | null,
  coverPath?: string | null,
  WorkspaceSettings?: WorkspaceSettings[];
}
