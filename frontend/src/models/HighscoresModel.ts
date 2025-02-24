import type { PlayerModel } from "@models/PlayerModel";

export interface HighscoresPlayerModel extends PlayerModel {
  score: number;
}

export interface HighscoresTableModel {
  players: HighscoresPlayerModel[];
}
