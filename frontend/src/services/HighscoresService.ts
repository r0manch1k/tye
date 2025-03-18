import type {
  HighscoresPlayerModel,
  HighscoresTableModel,
} from "@models/highscores";

import api from "./api";
import { AxiosError, type AxiosResponse } from "axios";

class HighscoresService {
  async getHighscores(): Promise<HighscoresTableModel> {
    let data: HighscoresTableModel;
    return await api
      .get<HighscoresTableModel>("/highscores/")
      .then((response: AxiosResponse<HighscoresTableModel>) => {
        console.log("Highscores fetched: ", response);
        data = response.data;
        return Promise.resolve(data);
      })
      .catch((error: Error | AxiosError) => {
        console.error("Error fetching highscores: ", error);
        return Promise.reject(error);
      });
  }

  async addHighscore(player: HighscoresPlayerModel): Promise<void> {
    await api.post("/highscores", player);
  }
}

export default new HighscoresService();
