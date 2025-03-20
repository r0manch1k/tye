import type Player from "./player";

export interface HighscoresPlayerModel extends Player {
  score: number;
  createdAt: string;
}

export interface HighscoresTableModel {
  players: HighscoresPlayerModel[];
  updatedAt: string;
}
