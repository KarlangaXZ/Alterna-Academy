/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/

import fs from "fs";

function parseCSV(filePath: string): string[][] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const parsedCSV: string[][] = [];

  for (const line of lines) {
    const values = line.split(",");
    parsedCSV.push(values);
  }

  return parsedCSV;
}

const filePath = "sample.csv";
const parsedData = parseCSV(filePath);
console.log(parsedData);