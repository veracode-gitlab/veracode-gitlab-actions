// import * as core from '@actions/core';
import appConfig from '../app-config';
import * as VeracodeApplication from '../namespaces/VeracodeApplication';
import * as http from '../api/http-request';
// import { Inputs, vaildateRemoveSandboxInput } from '../inputs';

export async function getApplicationByName(
  appname: string,
  vid: string,
  vkey: string,
): Promise<VeracodeApplication.Application> {
  try {
    const getApplicationByNameResource = {
      resourceUri: appConfig.applicationUri,
      queryAttribute: 'name',
      queryValue: encodeURIComponent(appname),
    };

    const applicationResponse: VeracodeApplication.ResultsData =
      await http.getResourceByAttribute<VeracodeApplication.ResultsData>(vid, vkey, getApplicationByNameResource);

    const applications = applicationResponse._embedded?.applications || [];
    if (applications.length === 0) {
      throw new Error(`No application found with name ${appname}`);
    } else if (applications.length > 1) {
      console.log(`Multiple applications found with name ${appname}, selecting the first found`);
    }

    return applications[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function removeSandbox(inputs: Inputs): Promise<void> {
//   if (!vaildateRemoveSandboxInput(inputs)) {
//     core.setFailed('sandboxname is required.');
//   }
//   const appname = inputs.appname;
//   const vid = inputs.vid;
//   const vkey = inputs.vkey;
//   const sandboxName = inputs.sandboxname;

//   let application: VeracodeApplication.Application;

//   try {
//     application = await getApplicationByName(appname, vid, vkey);
//   } catch (error) {
//     core.setFailed(`No application found with name ${appname}`);
//     throw new Error(`No application found with name ${appname}`);
//   }

//   const appGuid = application.guid;

//   let sandboxes: VeracodeApplication.Sandbox[];
//   try {
//     sandboxes = await getSandboxesByApplicationGuid(appGuid, vid, vkey);
//   } catch (error) {
//     throw new Error(`Error retrieving sandboxes for application ${appname}`);
//   }

//   const sandbox = sandboxes.find((s) => s.name === sandboxName);

//   if (sandbox === undefined) {
//     core.setFailed(`No sandbox found with name ${sandboxName}`);
//     return;
//   }

//   try {
//     const removeSandboxResource = {
//       resourceUri: appConfig.sandboxUri.replace('${appGuid}', appGuid),
//       resourceId: sandbox.guid,
//     };

//     await http.deleteResourceById(vid, vkey, removeSandboxResource);
//   } catch (error) {
//     core.debug(`Error removing sandbox:${error}`);
//     core.setFailed(`Error removing sandbox ${sandboxName}`);
//   }
// }

// async function getSandboxesByApplicationGuid(
//   appGuid: string,
//   vid: string,
//   vkey: string,
// ): Promise<VeracodeApplication.Sandbox[]> {
//   try {
//     const getSandboxesByApplicationGuidResource = {
//       resourceUri: appConfig.sandboxUri.replace('${appGuid}', appGuid),
//       queryAttribute: '',
//       queryValue: '',
//     };

//     const sandboxResponse: VeracodeApplication.SandboxResultsData =
//       await http.getResourceByAttribute<VeracodeApplication.SandboxResultsData>(
//         vid,
//         vkey,
//         getSandboxesByApplicationGuidResource,
//       );

//     return sandboxResponse._embedded?.sandboxes || [];
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
