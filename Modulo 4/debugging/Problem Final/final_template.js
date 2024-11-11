"use strict";
/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_process_1 = require("node:process");
function getConfigurationOptions(configFilePath) {
    try {
        const config = JSON.parse(node_fs_1.default.readFileSync(configFilePath).toString("utf-8"));
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
    }
    catch (error) {
        return { result: false, error: `${error}` };
    }
}
function validateData(_data) {
    return { isValid: true };
}
function parseCSV(filePath, options) {
    const csvData = node_fs_1.default
        .readFileSync(filePath, "utf-8")
        .toString()
        .replace(/\r\n/g, "\n"); // Normalize line endings
    let currentState = undefined;
    const scanCharacter = (char, lookAhead, config, currentState) => {
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
                if (currentState === "startDelimiter" ||
                    currentState === "insideDelimiter") {
                    return "insideDelimiter";
                }
                return "error";
        }
    };
    const data = [];
    let currentDataArray = [];
    let currentPosition = 0;
    let currentWord = "";
    for (const character of csvData) {
        const lookAhead = currentPosition < csvData.length
            ? csvData[currentPosition + 1]
            : undefined;
        currentState = scanCharacter(character, lookAhead, options, currentState);
        console.info(`${currentPosition}: '${character}' : [${currentState}] => ${lookAhead}`);
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
        data.push(currentDataArray); // Add last line if not terminated
    }
    console.info(data);
    return { isValid: true, data };
}
const filePath = node_process_1.argv[2];
const configPath = node_process_1.argv[3];
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
