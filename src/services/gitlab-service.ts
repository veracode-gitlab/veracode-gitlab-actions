import * as http from '../api/http-request';
import { GLIssue } from '../namespaces/GitLabIssue';

export async function getGitLabIssues(gitlabToken: string): Promise<GLIssue[]> {
  const gitlabApiUrl = process.env.CI_API_V4_URL;
  const gitlabProjectId = process.env.CI_PROJECT_ID;
  try {
    const getGitLabIssueResource = {
      resourceUri: `${gitlabApiUrl}/projects/${gitlabProjectId}/issues`,
      queryAttribute: 'per_page',
      queryValue: encodeURIComponent(100),
    };
    const gitlabIssues: GLIssue[] = await http.getGitLabResourceByAttribute<GLIssue[]>(
      getGitLabIssueResource,
      gitlabToken,
    );
    return gitlabIssues;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
