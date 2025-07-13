import { defineStore } from "pinia";
import GameSceneEnum from "@enums/GameSceneEnum";
import MenuSceneEnum from "@enums/MenuSceneEnum";
import { ref } from "vue";

export const useGameStateStore = defineStore("gameState", () => {
  const gameScene = ref<GameSceneEnum>(GameSceneEnum.Menu);
  const menuScene = ref<MenuSceneEnum>(MenuSceneEnum.Main);

  function setGameScene(scene: GameSceneEnum) {
    gameScene.value = scene;
  }

  function setMenuScene(scene: MenuSceneEnum) {
    menuScene.value = scene;
  }

  return {
    gameScene,
    setGameScene,
    setMenuScene,
  };
});
