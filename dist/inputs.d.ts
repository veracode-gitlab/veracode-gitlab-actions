export interface VeracodeActionsInputs {
    action: string;
    scan_type: string;
    profile_name: string;
    scan_guid: string;
    gitlab_token: string;
    create_issue: boolean;
    gitlab_project: string;
}
export declare const parseInputs: (getInput: string[]) => VeracodeActionsInputs;
