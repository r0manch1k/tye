<template>
  <div>
    <!-- <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a> -->
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button @click="fetchHighscoresTable">Fetch Mongo Collections</button>s
    <ul v-if="highscoresTable?.players">
      <li v-for="player in highscoresTable.players" :key="player.id">
        {{ player.username }}: {{ player.score }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { HighscoresTableModel } from "@models/HighscoresModel";
import HighscoresService from "@services/HighscoresService";

const highscoresTable = ref<HighscoresTableModel>();

async function fetchHighscoresTable() {
  console.log("Fetching highscores table...");
  await HighscoresService.getHighscores().then((data: HighscoresTableModel) => {
    highscoresTable.value = data;
  });
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
