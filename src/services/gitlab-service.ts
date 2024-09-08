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

export async function createGitLabIssue(gitlabToken: string, issue: GLIssue): Promise<void> {
  const gitlabApiUrl = process.env.CI_API_V4_URL;
  const gitlabProjectId = process.env.CI_PROJECT_ID;
  try {
    const createIssueResource = {
      resourceUri: `${gitlabApiUrl}/projects/${gitlabProjectId}/issues`,
      body: {
        title: issue.title,
        description: issue.description,
        labels: issue.labels,
      },
    };
    await http.createGitLabResource(createIssueResource, gitlabToken);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
