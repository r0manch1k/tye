import { Application, Request, Response } from "express";
import { Db, MongoError, ObjectId } from "mongodb";

import {
  HighscoresPlayerModel,
  HighscoresTableModel,
} from "@models/highscores";

// TODO: Fix alias
import { HighscoresService } from "./../services/highscores";
import { MetadataService } from "./../services/metadata";

export default function highscoresRoutes(app: Application, db: Db) {
  app.get("/highscores", async (req: Request, res: Response) => {
    const highscoresService: HighscoresService = new HighscoresService(db);
    await highscoresService
      .getHighscoresTable()
      .then((table: HighscoresTableModel) => {
        res.json(table);
      })
      .catch((error: MongoError) => {
        console.error(error.code, error.message);
        res.status(500).send(error.code + error.message);
      });
  });

  app.post(
    "/highscores",
    async (
      req: Request<object, object, HighscoresPlayerModel>,
      res: Response,
    ) => {
      if (!req.body || !req.body.username || !req.body.score) {
        res.status(400).send("MISSING_PARAMETERS");
        return;
      }
      if (typeof req.body.username !== "string") {
        res.status(400).send("INVALID_USERNAME");
        return;
      }
      if (
        typeof req.body.score !== "string" ||
        isNaN(parseInt(req.body.score))
      ) {
        res.status(400).send("INVALID_SCORE");
        return;
      }
      const player: HighscoresPlayerModel = {
        _id: new ObjectId(),
        username: req.body.username,
        score: parseInt(req.body.score as string),
      };
      let isRanked: boolean;
      const metadataService: MetadataService = new MetadataService(db);
      await metadataService
        .isRanked(player.score)
        .then((result: boolean) => {
          isRanked = result;
        })
        .catch((error: MongoError) => {
          console.error(error.code, error.message);
          res.status(500).send(error.code + error.message);
        });
      if (!isRanked) {
        res.status(400).send("NOT_RANKED");
        return;
      }
      const highscoresService: HighscoresService = new HighscoresService(db);
      return await highscoresService
        .insertPlayerToHighscores(player)
        .then(() => {
          res.status(201).send("OK");
        })
        .catch((error: MongoError) => {
          if (error.code === 11000) {
            res.status(409).send("DUPLICATE_USERNAME");
            return;
          }
          res.status(500).send(error.code + error.message);
        });
    },
  );
}
