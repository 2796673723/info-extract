import express from "express";
import { Extractor } from "./extract.js";
import cors from "cors";

const app = express();
const port = 5000;

let extractor = new Extractor();
await extractor.init();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/searchAndExtract", async (req, res) => {
  const { keyWord, start } = req.query;
  let info = await extractor.SearchAndExtract(keyWord, start);
  res.send(JSON.stringify(info));
});

app.get("/search", async (req, res) => {
  const { keyWord, start } = req.query;
  let info = await extractor.PageSearch(keyWord, start);
  res.send(JSON.stringify(info));
});

app.get("/extract", async (req, res) => {
  const { extractUrl } = req.query;
  let info = await extractor.extractInfo(extractUrl);
  res.send(JSON.stringify(info));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
