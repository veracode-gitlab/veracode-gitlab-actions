export interface GLIssue {
  id?: number;
  iid?: number;
  project_id?: number;
  title: string;
  description: string;
  state: string;
  labels: string[];
  severity: string;
  imported_from: string;
}
