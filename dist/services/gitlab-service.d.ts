import { GLIssue } from '../namespaces/GitLabIssue';
export declare function getGitLabIssues(gitlabToken: string): Promise<GLIssue[]>;
export declare function createGitLabIssue(gitlabToken: string, issue: GLIssue): Promise<void>;
