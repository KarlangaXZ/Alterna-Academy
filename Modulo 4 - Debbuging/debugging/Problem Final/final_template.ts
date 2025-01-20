/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/

import fs from "node:fs";
import { argv } from "node:process";

type ConfigParameters = {
  delimiter: '"' | "'";
  terminator: "\n";
  separator: "," | ";" | "|";
  hasHeaders: boolean;
};

function getConfigurationOptions(
  configFilePath: string
):
  | { result: true; options: ConfigParameters }
  | { result: false; error: string } {
  try {
    const config: ConfigParameters = JSON.parse(
      fs.readFileSync(configFilePath).toString("utf-8")
    );

    if (!config.delimiter) {
      return {
        result: false,
        error: `Configuration file '${configFilePath}' has no 'delimiter' parameter.`,
      };
    }

    if (!config.hasHeaders) {
      return {
        result: false,
        error: `Configuration file '${configFilePath}' has no 'hasHeaders' parameter.`,
      };
    }

    if (!config.separator) {
      return {
        result: false,
        error: `Configuration file '${configFilePath}' has no 'separator' parameter.`,
      };
    }

    if (!config.terminator) {
      return {
        result: false,
        error: `Configuration file '${configFilePath}' has no 'terminator' parameter.`,
      };
    }

    return { result: true, options: config };
  } catch (error) {
    return { result: false, error: `${error}` };
  }
}

function validateData(
  _data: string[][]
): { isValid: false; error: string } | { isValid: true } {
  return { isValid: true };
}

function parseCSV(
  filePath: string,
  options: ConfigParameters
): { isValid: true; data: string[][] } | { isValid: false; error: string } {
  const csvData = fs
    .readFileSync(filePath, "utf-8")
    .toString()
    .replace(/\r\n/g, "\n"); // Normalize line endings

  type ParseState =
    | "startDelimiter"
    | "insideDelimiter"
    | "endDelimiter"
    | "atSeparator"
    | "atTerminator"
    | "error"
    | undefined;

  let currentState: ParseState = undefined;

  const scanCharacter = (
    char: string,
    lookAhead: string | undefined,
    config: ConfigParameters,
    currentState: ParseState
  ): ParseState => {
    if (currentState === "insideDelimiter" && char !== config.delimiter) {
      return "insideDelimiter";
    }

    switch (char) {
      case config.delimiter:
        if (currentState === "insideDelimiter") {
          return "endDelimiter";
        }
        return "startDelimiter";
      case config.separator:
        return "atSeparator";
      case config.terminator:
        return "atTerminator";
      default:
        if (
          currentState === "startDelimiter" ||
          currentState === "insideDelimiter"
        ) {
          return "insideDelimiter";
        }
        return "error";
    }
  };

  const data: string[][] = [];
  let currentDataArray: string[] = [];
  let currentPosition = 0;
  let currentWord = "";
  for (const character of csvData) {
    const lookAhead =
      currentPosition < csvData.length
        ? csvData[currentPosition + 1]
        : undefined;
    currentState = scanCharacter(character, lookAhead, options, currentState);
    console.info(
      `${currentPosition}: '${character}' : [${currentState}] => ${lookAhead}`
    );

    if (currentState === "startDelimiter") {
      currentWord = "";
    }

    if (currentState === "insideDelimiter") {
      currentWord += character;
    }

    if (currentState === "endDelimiter") {
      currentDataArray.push(currentWord);
      currentWord = "";
    }

    if (currentState === "atSeparator") {
      if (currentState !== "endDelimiter") {
        currentDataArray.push(currentWord);
        currentWord = "";
      }
    }

    if (currentState === "atTerminator") {
      if (currentDataArray.length > 0) {
        data.push(currentDataArray);
        currentDataArray = [];
      }
    }

    if (currentState === "error") {
      return {
        isValid: false,
        error: `Character at position ${currentPosition} is invalid.`,
      };
    }
    currentPosition += 1;
  }

  if (currentDataArray.length > 0) {
    data.push(currentDataArray); 
  }

  console.info(data);
  return { isValid: true, data };
}

const filePath = argv[2];
const configPath = argv[3];

if (!filePath || !configPath) {
  console.error("File and configuration paths are required.");
  process.exit(1);
}

const configuration = getConfigurationOptions(configPath);
if (!configuration.result) {
  console.error(configuration.error);
  process.exit(1);
}

const csvData = parseCSV(filePath, configuration.options);
console.info(csvData);
