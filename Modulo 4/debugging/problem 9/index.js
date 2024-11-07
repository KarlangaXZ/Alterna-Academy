"use strict";
/*
  Customer states: Application generates a CSV export of personnel data;
  upon attempting to import this data to Microsoft SQL Server, data is
  corrupted; please diagnose and advise.

  CSV is formatted exactly as table is defined: (varchar, integer, varchar, varchar).
*/
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function parseCSV(filePath) {
    var fileContent = fs_1.default.readFileSync(filePath, "utf-8");
    var lines = fileContent.split("\n");
    var parsedCSV = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var values = line.split(",");
        parsedCSV.push(values);
    }
    return parsedCSV;
}
var filePath = "sample.csv";
var parsedData = parseCSV(filePath);
console.log(parsedData);
