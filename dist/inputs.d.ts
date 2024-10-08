export interface VeracodeActionsInputs {
    action: string;
    scan_type: string;
    profile_name: string;
    scan_guid: string;
    gitlab_token: string;
    create_issue: boolean;
    api_id: string;
    api_key: string;
    src_root: string;
    jsp_root: string;
}
export declare const parseInputs: (getInput: string[]) => VeracodeActionsInputs;
