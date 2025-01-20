"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let storage = [];
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/items/", (req, res) => {
    res.json(storage);
});
app.get("/item/:id", (req, res) => {
    console.info(req.params.id);
    const item = storage.find((item) => item.id === req.params.id);
    if (!item) {
        res.status(404).json({ error: "Item not found" });
        return;
    }
    res.json(item);
});
app.post("/item/:id", (req, res) => {
    const newStoredItem = Object.assign(Object.assign({}, req.params), req.body);
    console.info(JSON.stringify(newStoredItem, null, 2));
    storage.push(newStoredItem);
    res.status(200).json(newStoredItem);
});
app.delete("/item/:id", (req, res) => {
    const selectedIndex = storage.findIndex(i => i.id === req.params.id);
    if (selectedIndex !== -1) {
        const deletedItem = storage.splice(selectedIndex, 1);
        console.info(JSON.stringify(deletedItem, null, 2));
    }
});
app.listen(8081, () => {
    console.log("Running on port 8081");
});
