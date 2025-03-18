import { Db, MongoError, OptionalId } from "mongodb";

import {
  HighscoresPlayerModel,
  HighscoresTableModel,
} from "@models/highscores";
import { MetadataModel } from "@models/metadata";

import { MetadataService } from "./metadata";

export class HighscoresService {
  private db: Db;
  private collection: string = process.env.MONGO_INITDB_COLLECTION;
  private highscoresTableSize: number = parseInt(
    process.env.HIGHSCORES_TABLE_SIZE,
    10,
  );

  constructor(db: Db) {
    this.db = db;
  }

  public async getHighscoresTable(): Promise<HighscoresTableModel> {
    let players: HighscoresPlayerModel[];
    let metadata: MetadataModel;

    await this.db
      .collection<HighscoresPlayerModel>(this.collection)
      .find()
      .sort({ score: -1 })
      .limit(this.highscoresTableSize)
      .toArray()
      .then((document: HighscoresPlayerModel[]) => {
        players = document;
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });

    const metadataService = new MetadataService(this.db);

    if (players.length != 0) {
      await metadataService
        .updateLastPlayerScore(players[players.length - 1].score)
        .catch((error: MongoError) => {
          return Promise.reject(error);
        });

      await metadataService
        .getMetadata()
        .then((document: MetadataModel) => {
          metadata = document;
        })
        .catch((error: MongoError) => {
          return Promise.reject(error);
        });
    }

    const table: HighscoresTableModel = {
      players: players,
      updatedAt: metadata ? metadata.highscoresTableUpdatedAt : "",
    };

    return Promise.resolve(table);
  }

  public async insertPlayerToHighscores(
    player: HighscoresPlayerModel,
  ): Promise<void> {
    const collection = this.db.collection<OptionalId<HighscoresPlayerModel>>(
      this.collection,
    );

    await collection.insertOne(player).catch((error: MongoError) => {
      return Promise.reject(error);
    });

    const metadataService = new MetadataService(this.db);

    await metadataService
      .updateHighscoresTableUpdatedAt()
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });

    await collection
      .createIndex({ username: 1 }, { unique: true })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
    return Promise.resolve();
  }

  public async removeOldPlayersFromHighscores(): Promise<void> {
    const collection = this.db.collection<HighscoresPlayerModel>(
      this.collection,
    );

    const highscores = (await collection
      .find()
      .sort({ score: -1 })
      .limit(this.highscoresTableSize)
      .toArray()
      .catch((error: MongoError) => {
        return Promise.reject(error);
      })) as HighscoresPlayerModel[];

    const playersIds = highscores.map((player) => player._id);

    await collection
      .deleteMany({
        _id: { $nin: playersIds },
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
  }
}
