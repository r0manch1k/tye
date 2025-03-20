import { Db, MongoError, StrictUpdateFilter } from "mongodb";

import { MetadataModel } from "@models/metadata";

export class MetadataService {
  private db: Db;
  private collection: string = process.env.METADATA_COLLECTION_NAME;

  constructor(db: Db) {
    this.db = db;
  }

  public async getMetadata(): Promise<MetadataModel> {
    return await this.db
      .collection<MetadataModel>(this.collection)
      .findOne({ _id: this.collection })
      .then((document: MetadataModel) => {
        return Promise.resolve(document);
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
  }

  public async isRanked(score: number): Promise<boolean> {
    return await this.db
      .collection<MetadataModel>(this.collection)
      .findOne({ _id: this.collection })
      .then((document: MetadataModel) => {
        if (!document || !document.lastPlayerScore) {
          return Promise.resolve(true);
        }
        return Promise.resolve(document.lastPlayerScore <= score);
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
  }

  public async updateLastPlayerScore(score: number): Promise<void> {
    const updateFilter: StrictUpdateFilter<MetadataModel> = {
      $set: {
        lastPlayerScore: score,
      },
    };
    return await this.db
      .collection<MetadataModel>(this.collection)
      .updateOne(
        {
          _id: this.collection,
        },
        updateFilter,
        {
          upsert: true,
        },
      )
      .then(() => {
        return Promise.resolve();
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
  }

  public async updateHighscoresTableUpdatedAt(
    createdAt: string,
  ): Promise<void> {
    const updateFilter: StrictUpdateFilter<MetadataModel> = {
      $set: {
        highscoresTableUpdatedAt: createdAt,
      },
    };
    return await this.db
      .collection<MetadataModel>(this.collection)
      .updateOne({ _id: this.collection }, updateFilter, {
        upsert: true,
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch((error: MongoError) => {
        return Promise.reject(error);
      });
  }
}

export default MetadataService;
