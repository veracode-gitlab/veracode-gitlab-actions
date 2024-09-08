/*
command args
0 - required    - action            = processPolicyResults|processPipelineResults
1 - required    - scan_type         = policy|sandobx
2 - required    - porfile_name      = PROFILE_NAME
3 - optional    - app_guid          = EMPTY|APP_GUID
4 - optional    - scan_guid         = EMPTY|SCAN_GUID
5 - optional    - sandbox_name      = SANDBOX_NAME
6 - optional    - sandbox_guid      = SANDBOX_GUID
7 - required    - gitlab_token      = GITLAB PRIVATE TOKEN
8 - required    - create_issue      = true|false
9 - required    - gitlab_project    = GITLAB PROJECT IP 
10 - optional   - api_id            = VERACODE API ID
11 - optional   - api_key           = VERACODE API KEY
12 - optional   - src_root          = SRC_ROOT
13 - optional   - jsp_root          = JSP_ROOT
*/

export interface VeracodeActionsInputs {
  action: string;
  scan_type: string;
  profile_name: string;
  scan_guid: string;
  gitlab_token: string;
  create_issue: boolean;
  gitlab_project: string;
  api_id: string;
  api_key: string;
  src_root: string;
  jsp_root: string;
}

export const parseInputs = (getInput: string[]): VeracodeActionsInputs => {
  // Create a map for efficient lookup
  const inputMap: Record<string, string> = {};
  getInput.forEach((input) => {
    const [key, value] = input.split('=');
    inputMap[key.trim()] = value.trim(); // Trim both key and value
  });

  // Validate input array length and format
  if (
    !inputMap.action ||
    !inputMap.scan_type ||
    !inputMap.profile_name ||
    !inputMap.gitlab_token ||
    !inputMap.create_issue ||
    !inputMap.gitlab_project
  ) {
    throw new Error('Invalid input. Please provide all required inputs.');
  }

  // Extract values and perform type conversions
  const action = inputMap.action;
  const scan_type = inputMap.scan_type;
  const profile_name = inputMap.profile_name;
  const gitlab_token = inputMap.gitlab_token;
  const gitlab_project = inputMap.gitlab_project;
  const create_issue = inputMap.create_issue === 'true';
  const scan_guid = '';
  const api_id = inputMap.app_id ?? process.env.VERACODE_API_ID;
  const api_key = inputMap.app_key ?? process.env.VERACODE_API_KEY;
  const src_root = inputMap.src_root ?? process.env.SRC_ROOT;
  const jsp_root = inputMap.jsp_root ?? process.env.JSP_ROOT;

  if (!api_id || !api_key) {
    throw new Error('Invalid input. Missing VERACODE_API_ID or VERACODE_API_KEY.');
  }

  return {
    action,
    scan_type,
    profile_name,
    scan_guid,
    gitlab_token,
    create_issue,
    gitlab_project,
    api_id,
    api_key,
    src_root,
    jsp_root,
  };
};
