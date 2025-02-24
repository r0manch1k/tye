import express, { Express, Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app: Express = express();
const port = process.env.PORT || 3000;
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

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const database = client.db(db);
    const col = database.collection(collection);
    const documents = await col.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving documents");
  } finally {
    await client.close();
  }
});

app.get("/highscores", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const database = client.db(db);
    const col = database.collection(collection);
    const documents = await col.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving documents");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
