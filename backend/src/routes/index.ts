import { Application } from "express";
import { Db } from "mongodb";

import highscoresRoutes from "./highscores";

export default function (app: Application, db: Db) {
  highscoresRoutes(app, db);
}
