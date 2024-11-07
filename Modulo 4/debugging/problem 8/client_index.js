"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const get_all_response = yield axios_1.default.get("http://localhost:8081/items/");
        console.info(get_all_response.data);
        yield addItem({ id: 100, nombre: "Oliver", carro: "Veloster" });
    });
}
function addItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
        const post_item_response = yield axios_1.default.post(`http://localhost:8081/item/${item.id}`, Object.assign({}, item));
        console.info(post_item_response.data);
    });
}
main();
