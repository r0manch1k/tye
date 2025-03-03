import express, { Express, Request, Response } from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app: Express = express();
const port: number = parseInt(process.env.PORT) || 3000;
const uri = process.env.MONGO_URI;
const db = process.env.MONGO_INITDB_DATABASE;
const collection = process.env.MONGO_INITDB_COLLECTION;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.get("/highscores/", async (req: Request, res: Response) => {
  console.log("Request");
  try {
    await client.connect();
    const database = client.db(db);
    const col = database.collection(collection);
    // TODO: Fix serialization
    const documents = await col.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving documents");
  } finally {
    await client.close();
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port", port);
});
