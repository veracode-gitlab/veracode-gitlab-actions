// import { parseInputs } from './inputs';
// import * as policyService from './services/policy-service';
// import * as pipelineResultsService from './services/pipeline-results-service';
import * as policyResultsService from './services/policy-results-services';
// import * as applicationService from './services/application-service';

import { parseInputs } from './inputs';

/**
 * Runs the action.
 */
export async function run(): Promise<void> {
  // Get the input parameters
  const myArgs = process.argv.slice(2);
  const inputs = parseInputs(myArgs);

  switch (inputs.action) {
    case 'processPolicyResults':
      await policyResultsService.preparePolicyResults(inputs);
      break;
    default:
      throw new Error('Invalid action');
      
  }

  // switch (inputs.action) {
  //   case 'getPolicyNameByProfileName':
  //     await policyService.getPolicyNameByProfileName(inputs);
  //     break;
  //   case 'preparePipelineResults':
  //     await pipelineResultsService.preparePipelineResults(inputs);
  //     break;
  //   case 'preparePolicyResults':
  //     await policyResultsService.preparePolicyResults(inputs);
  //     break;
  //   case 'removeSandbox':
  //     await applicationService.removeSandbox(inputs);
  //     break;
  //   default:
  //     core.setFailed(
  //       `Invalid action: ${inputs.action}. Allowed actions are: getPolicyNameByProfileName, preparePipelineResults, preparePolicyResults, removeSandbox.`,
  //     );
  // }
}
