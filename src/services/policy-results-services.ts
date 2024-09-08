import { VeracodeActionsInputs } from '../inputs';
import * as VeracodePolicyResult from '../namespaces/VeracodePolicyResult';
import { getApplicationFindings } from './findings-service';
import { getApplicationByName } from './application-service';
import * as VeracodeApplication from '../namespaces/VeracodeApplication';


export async function preparePolicyResults(inputs: VeracodeActionsInputs): Promise<void> {
  const veracodeApp: VeracodeApplication.Application = await getApplicationByName(inputs.profile_name, inputs.api_id, inputs.api_key);
  const findings: VeracodePolicyResult.Finding[] = await getApplicationFindings(veracodeApp.guid, inputs.api_id, inputs.api_key);

  if (findings.length > 0 )
  {
    //always generate security tab json file
    console.log('Json file will be created')

    const jsonFindings: string[] = []; // Array of stringified findings
    const startTime = new Date().toISOString().substring(0, 19); // Extract date and time without milliseconds

    for (const finding of findings) {
      if (finding.violates_policy) {
        const severity = getSeverity(finding.finding_details.severity); // Use function for severity mapping
        const description = processDescription(finding.description); // Use function for description processing

        const jsonFinding = {
          id: `${finding.issue_id}-${finding.context_guid}-${finding.build_id}`,
          category: 'sast',
          severity,
          description,
        };

        jsonFindings.push(JSON.stringify(jsonFinding));
      }
    }

    const jsonEnd = `,"scan": {
        "analyzer": {
          "id": "veracodeSAST",
          "name": "Veracode SAST",
          "url": "https://www.veracode.com",
          "vendor": {
            "name": "Veracode"
          },
          "version": "latest"
        },
        "scanner": {
          "id": "veracodeSAST",
          "name": "Veracode SAST",
          "url": "https://www.veracode.com",
          "vendor": {
            "name": "Veracode"
          },
          "version": "latest"
        },
        "primary_identifiers": [],
        "type": "sast",
        "start_time": "${startTime}",
        "end_time": "${startTime}",
        "status": "success"
      }
    }`;

    const fullReportJson = `{"version": "15.0.4","vulnerabilities": [${jsonFindings.join(',')}]${jsonEnd}`;

    console.log(fullReportJson);
  }
}

// Function to map severity values (optional)
function getSeverity(weight: number) {
  switch (weight) {
    case 0:
      return 'Info';
    case 1:
      return 'Unknown';
    case 2:
      return 'Low';
    case 3:
      return 'Medium';
    case 4:
      return 'High';
    case 5:
      return 'Critical';
    default:
      return 'Unknown';
  }
}

function processDescription(description: string): string {
  // Remove span tags
  description = description.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');
  // Remove link tags (anchor tags)
  description = description.replace(/<a href="([^"]+)">(.*?)<\/a>/g, '$2 ($1)');
  // Add a new line before "References:"
  description = description.replace('References:', '\nReferences:');

  return description;
}