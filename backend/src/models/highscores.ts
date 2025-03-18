import type Player from "./player";

export interface HighscoresPlayerModel extends Player {
  score: number;
}

export interface HighscoresTableModel {
  players: HighscoresPlayerModel[];
  updatedAt: string;
}
