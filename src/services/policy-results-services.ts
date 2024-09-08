import { VeracodeActionsInputs } from '../inputs';
import * as VeracodePolicyResult from '../namespaces/VeracodePolicyResult';
import { getApplicationFindings } from './findings-service';
import { getApplicationByName } from './application-service';
import * as VeracodeApplication from '../namespaces/VeracodeApplication';
import { promises as fs } from 'fs'; // Using promises for asynchronous file operations
import * as path from 'path'; // Import the path module

const gitlabOutputFileName = 'output-sast-vulnerabilites.json';

export async function preparePolicyResults(inputs: VeracodeActionsInputs): Promise<void> {
  const veracodeApp: VeracodeApplication.Application = await getApplicationByName(
    inputs.profile_name,
    inputs.api_id,
    inputs.api_key,
  );
  const findings: VeracodePolicyResult.Finding[] = await getApplicationFindings(
    veracodeApp.guid,
    inputs.api_id,
    inputs.api_key,
  );

  if (findings.length > 0) {
    //always generate security tab json file
    console.log('Json file will be created');

    const jsonFindings: string[] = []; // Array of stringified findings
    const startTime = new Date().toISOString().substring(0, 19); // Extract date and time without milliseconds

    for (const finding of findings) {
      if (finding.violates_policy) {
        const id = finding.issue_id + '-' + finding.context_guid + '-' + finding.build_id;
        const severity = getSeverity(finding.finding_details.severity); // Use function for severity mapping
        const description = processDescription(finding.description); // Use function for description processing
        const cwe = finding.finding_details.cwe.id;
        const cweName = finding.finding_details.cwe.name;
        const lineNumber = finding.finding_details.file_line_number;
        // const method = finding.finding_details.procedure;
        let filePath = finding.finding_details.file_path;
        if (inputs.src_root && inputs.jsp_root) {
          if (filePath.startsWith('/WEB-INF'))
            filePath = inputs.jsp_root + filePath;
          else
            filePath = inputs.src_root + filePath;
        }

        const jsonFinding = {
          id: `${finding.issue_id}-${finding.context_guid}-${finding.build_id}`,
          category: 'sast',
          name: cweName,
          message: cweName,
          cve: id,
          severity,
          description,
          scanner: {
            id: 'security_code_scan',
            name: 'Veracode Static Code Analysis',
          },
          location: {
            file: filePath,
            start_line: lineNumber,
            end_line: lineNumber,
          },
          identifiers: {
            type: 'CWE',
            name: 'CWE-' + cwe,
            value: cwe,
            url: `https://cwe.mitre.org/data/definitions/${cwe}.html`,
          },
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

    // Get the current working directory from the GitLab Runner environment variable
    const cwd = process.env.CI_PROJECT_DIR;

    try {
      if (cwd) {
        await fs.writeFile(path.join(cwd, gitlabOutputFileName), fullReportJson);
      } else {
        console.error('Error: CI_PROJECT_DIR environment variable is undefined.');
      }
      console.log(`Json file written to: ${path.join(cwd || '', gitlabOutputFileName)}`);
    } catch (error) {
      console.error(`Error writing json file: ${error}`);
    }
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
