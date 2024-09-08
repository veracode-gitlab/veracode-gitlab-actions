import * as policyResultsService from './services/policy-results-services';

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
}
