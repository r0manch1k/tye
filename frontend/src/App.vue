<template>
  <Transition>
    <Menu v-if="gameStateStore.gameScene === GameSceneEnum.Menu" />
    <Game v-else-if="gameStateStore.gameScene === GameSceneEnum.Game" />
  </Transition>
</template>

<script lang="ts" setup>
import Menu from "@components/Menu.vue";
import Game from "@components/Game.vue";
import { useGameStateStore } from "@stores/state";
import GameSceneEnum from "@enums/GameSceneEnum";

const gameStateStore = useGameStateStore();
</script>

<style></style>
