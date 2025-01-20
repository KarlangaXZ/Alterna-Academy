import express, { Request, Response } from 'express';

type StoredItem = Record<string, unknown> & { id: string };

let storage: StoredItem[] = [];

const app = express();
app.use(express.json());

app.get("/items/", (req: Request, res: Response) => {
  res.json(storage);
});

app.get("/item/:id", (req: Request, res: Response) => {
  const item = storage.find((item) => item.id === req.params.id);

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  res.json(item);
});

app.post("/item/:id", (req: Request, res: Response) => {

const id = req.params.id;
if (storage.some(item => item.id === id)) {
  res.status(400).json({ error: `ID '${id}' already exists. Please use a unique ID.` });
  return;
}

const newStoredItem: StoredItem = {
  id: req.params.id,
  name: req.body.name,
};


if (Object.values(newStoredItem).includes("unknown")) {
  res.status(400).json({ error: "Invalid value 'unknown' detected. Please provide valid data." });
  return;
}

if (Array.isArray(newStoredItem.name)) {
  res.status(400).json({ error: "Only one item should be posted at a time. Please send a single item." });
  return;
}

storage.push(newStoredItem);
res.status(201).json(newStoredItem);
});

app.delete("/item/:id", (req: Request, res: Response) => {
  const selectedIndex = storage.findIndex(i => i.id === req.params.id)
  if (selectedIndex !== -1) {
    const deletedItem = storage.splice(selectedIndex, 1);
    console.info(JSON.stringify(deletedItem, null, 2));
  }
});

app.listen(8081, () => {
  console.log("Running on port 8081");
});