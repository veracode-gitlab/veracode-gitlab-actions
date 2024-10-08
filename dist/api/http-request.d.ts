interface Resource {
    resourceUri: string;
    queryAttribute?: string;
    queryValue?: string;
    body?: Record<string, unknown>;
}
interface ResourceById {
    resourceUri: string;
    resourceId: string;
}
export declare function createGitLabResource(resource: Resource, gitlabToken: string): Promise<void>;
export declare function getGitLabResourceByAttribute<T>(resource: Resource, gitlabToken: string): Promise<T>;
export declare function getResourceByAttribute<T>(vid: string, vkey: string, resource: Resource): Promise<T>;
export declare function deleteResourceById(vid: string, vkey: string, resource: ResourceById): Promise<void>;
export {};
