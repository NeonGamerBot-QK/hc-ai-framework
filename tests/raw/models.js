import { AiApiWrapper } from "../../src/index.js";
const client = new AiApiWrapper({ apiKey: process.env.API_KEY });

client.v1
  .getEmbeddings({
    model: "qwen/qwen3-embedding-8b",
    input: "The quick brown fox jumps over the lazy dog",
  })
  .then((d) => console.log(d));
