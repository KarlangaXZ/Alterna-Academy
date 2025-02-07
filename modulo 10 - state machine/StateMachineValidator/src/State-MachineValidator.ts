import * as fs from 'fs';  

type StateMachine = {
    states:{[key:string]:{[key:string]:string}};
    initialState:string;
    finalStates:string[];
};

class FMS {
    private states:{[key:string]:{[key:string]:string}};
    private initialState:string;
    private finalStates:string[];

    constructor(json:StateMachine){
        this.states = json.states;
        this.initialState = json.initialState;
        this.finalStates = json.finalStates;

    }

    validate(input: string):boolean{
        let currentState = this.initialState;

        for(const char of input){
            if(!this.states[currentState]|| !this.states[currentState][char]){
                return false;
            }
            currentState = this.states[currentState][char];
        }
        return this.finalStates.includes(currentState);
    }
}

const path = require('path');
const jsonFile = path.join(__dirname, '../fsm.json'); ;
const fmsJson: StateMachine = JSON.parse(fs.readFileSync(jsonFile,'utf-8'));

const fms = new FMS(fmsJson);
const input = process.argv[2] || "";
console.log(fms.validate(input));