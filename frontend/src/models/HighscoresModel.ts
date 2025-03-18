import type PlayerModel from "./PlayerModel";

export interface HighscoresPlayerModel extends PlayerModel {
  score: number;
}

export interface HighscoresTableModel {
  players: HighscoresPlayerModel[];
  updatedAt: string;
}
