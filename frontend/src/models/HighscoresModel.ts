import type PlayerModel from "./PlayerModel";

export interface HighscoresPlayerModel extends PlayerModel {
  score: number;
  createdAt: string;
}

export interface HighscoresTableModel {
  players: HighscoresPlayerModel[];
  updatedAt: string;
}
