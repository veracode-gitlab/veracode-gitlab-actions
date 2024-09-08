import { calculateAuthorizationHeader } from './veracode-hmac';
import appConfig from '../app-config';

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

export async function createGitLabResource(resource: Resource, gitlabToken: string): Promise<void> {
  const resourceUri = resource.resourceUri;
  const body = resource.body;
  const headers = {
    'Content-Type': 'application/json',
    'PRIVATE-TOKEN': gitlabToken,
  }
  const appUrl = `${resourceUri}`;
  try {
    await fetch(appUrl, { method: 'POST', headers, body: JSON.stringify(body) });
  } catch (error) {
    throw new Error('Failed to create resource.');
  }
}

export async function getGitLabResourceByAttribute<T>(resource: Resource, gitlabToken: string): Promise<T> {
  const resourceUri = resource.resourceUri;
  const queryAttribute = resource.queryAttribute;
  const queryValue = resource.queryValue;

  const urlQueryParams = queryAttribute !== '' ? `?${queryAttribute}=${queryValue}` : '';
  const headers = {
    'PRIVATE-TOKEN': gitlabToken,
  };
  const appUrl = `${resourceUri}${urlQueryParams}`;
  try {
    const response = await fetch(appUrl, { headers });
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw new Error('Failed to fetch resource.');
  }
}

export async function getResourceByAttribute<T>(vid: string, vkey: string, resource: Resource): Promise<T> {
  const resourceUri = resource.resourceUri;
  const queryAttribute = resource.queryAttribute;
  const queryValue = resource.queryValue;

  const urlQueryParams = queryAttribute !== '' ? `?${queryAttribute}=${queryValue}` : '';
  const queryUrl = resourceUri + urlQueryParams;
  const headers = {
    Authorization: calculateAuthorizationHeader({
      id: vid,
      key: vkey,
      host: appConfig.hostName,
      url: queryUrl,
      method: 'GET',
    }),
  };
  const appUrl = `https://${appConfig.hostName}${resourceUri}${urlQueryParams}`;
  try {
    const response = await fetch(appUrl, { headers });
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw new Error('Failed to fetch resource.');
  }
}

export async function deleteResourceById(vid: string, vkey: string, resource: ResourceById): Promise<void> {
  const resourceUri = resource.resourceUri;
  const resourceId = resource.resourceId;

  const queryUrl = `${resourceUri}/${resourceId}`;
  const headers = {
    Authorization: calculateAuthorizationHeader({
      id: vid,
      key: vkey,
      host: appConfig.hostName,
      url: queryUrl,
      method: 'DELETE',
    }),
  };
  const appUrl = `https://${appConfig.hostName}${resourceUri}/${resourceId}`;
  try {
    await fetch(appUrl, { method: 'DELETE', headers });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete resource.');
  }
}
