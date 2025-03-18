<template>
  <div>
    <button @click="fetchHighscoresTable">Fetch Mongo Collections</button>s
    <ul v-if="highscoresTable?.players">
      <li v-for="player in highscoresTable.players" :key="player._id">
        {{ player.username }}: {{ player.score }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { HighscoresTableModel } from "@models/HighscoresModel";
import HighscoresService from "@services/HighscoresService";
import type { AxiosError } from "axios";

const highscoresTable = ref<HighscoresTableModel>();

async function fetchHighscoresTable() {
  await HighscoresService.getHighscores()
    .then((data: HighscoresTableModel) => {
      highscoresTable.value = data;
    })
    .catch((error: Error | AxiosError) => {
      console.error(error);
    })
    .finally(() => {
      console.log("That's all!");
    });
}
</script>

<style scoped></style>
