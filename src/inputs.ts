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
*/

export interface VeracodeActionsInputs {
  action: string;
  scan_type: string;
  profile_name: string;
  scan_guid: string;
  gitlab_token: string;
  create_issue: boolean;
  gitlab_project: string;
}

export const parseInputs = (getInput: string[]): VeracodeActionsInputs => {
  // Create a map for efficient lookup
  const inputMap: Record<string, string> = {};
  getInput.forEach((input) => {
    const [key, value] = input.split('=');
    inputMap[key] = value;
  });

  // Extract values and perform type conversions
  const action = inputMap.action;
  const scan_type = inputMap.scan_type;
  const profile_name = inputMap.profile_name;
  const gitlab_token = inputMap.gitlab_token;
  const gitlab_project = inputMap.gitlab_project;
  const create_issue = inputMap.create_issue === 'true';
  const scan_guid = '';

  // Validate input array length and format
  

  return { action, scan_type, profile_name, scan_guid, gitlab_token, create_issue, gitlab_project };
};

// import { InputOptions } from '@actions/core';

// type GetInput = (name: string, options?: InputOptions | undefined) => string;

// export enum Actions {
//   GetPolicyNameByProfileName = 'getPolicyNameByProfileName',
//   PreparePipelineResults = 'preparePipelineResults',
//   PreparePolicyResults = 'preparePolicyResults',
//   RemoveSandbox = 'removeSandbox',
// }

// export type Inputs = {
//   action: Actions;
//   vid: string;
//   vkey: string;
//   appname: string;
//   token: string;
//   check_run_id: number;
//   source_repository: string;
//   fail_checks_on_policy: boolean;
//   fail_checks_on_error: boolean;
//   filter_mitigated_flaws: boolean;
//   sandboxname: string;
// };

// export const parseInputs = (getInput: GetInput): Inputs => {
//   const action = getInput('action', { required: true }) as Actions;

//   // Validate the action value
//   if (!Object.values(Actions).includes(action)) {
//     throw new Error(`Invalid action: ${action}. It must be one of '${Object.values(Actions).join("' or '")}'.`);
//   }

//   const vid = getInput('vid', { required: true });
//   const vkey = getInput('vkey', { required: true });
//   const appname = getInput('appname', { required: true });

//   const token = getInput('token');
//   const check_run_id = getInput('check_run_id');
//   const source_repository = getInput('source_repository');

//   const fail_checks_on_policy = getInput('fail_checks_on_policy') === 'true';
//   const fail_checks_on_error = getInput('fail_checks_on_error') === 'true';
//   const filter_mitigated_flaws = getInput('filter_mitigated_flaws') === 'true';

//   const sandboxname = getInput('sandboxname');

//   if (source_repository && source_repository.split('/').length !== 2) {
//     throw new Error('source_repository needs to be in the {owner}/{repo} format');
//   }

//   return {
//     action,
//     token,
//     check_run_id: +check_run_id,
//     vid,
//     vkey,
//     appname,
//     source_repository,
//     fail_checks_on_policy,
//     fail_checks_on_error,
//     filter_mitigated_flaws,
//     sandboxname,
//   };
// };

// export const vaildateScanResultsActionInput = (inputs: Inputs): boolean => {
//   console.log(inputs);
//   if (!inputs.token || !inputs.check_run_id || !inputs.source_repository) {
//     return false;
//   }
//   return true;
// };

// export const vaildateRemoveSandboxInput = (inputs: Inputs): boolean => {
//   console.log(inputs);
//   if (!inputs.sandboxname) {
//     return false;
//   }
//   return true;
// };
