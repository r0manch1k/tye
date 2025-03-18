import cors from "cors";
import express, { Express } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import bodyParser from "body-parser";

import routes from "./routes";

const app: Express = express();
const port: number = parseInt(process.env.PORT) || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db(process.env.MONGO_INITDB_DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

routes(app, db);

app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port", port);
});
