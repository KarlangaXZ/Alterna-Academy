"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FMS = /** @class */ (function () {
    function FMS(json) {
        this.states = json.states;
        this.initialState = json.initialState;
        this.finalStates = json.finalStates;
    }
    FMS.prototype.validate = function (input) {
        var currentState = this.initialState;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            if (!this.states[currentState] || !this.states[currentState][char]) {
                return false;
            }
            currentState = this.states[currentState][char];
        }
        return this.finalStates.includes(currentState);
    };
    return FMS;
}());
var jsonFile = 'fms.json';
var fmsJson = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
var fms = new FMS(fmsJson);
var input = process.argv[2] || "";
console.log(fms.validate(input));
