<template>
  <div class="menu-container">
    <Transition>
      <Start v-if="state.currentMenuScene === 'start'" />
      <Options v-else-if="state.currentMenuScene === 'options'" />
      <Settings v-else-if="state.currentMenuScene === 'settings'" />
      <Highscores v-else-if="state.currentMenuScene === 'highscores'" />
      <Credits v-else-if="state.currentMenuScene === 'credits'" />
    </Transition>
    <div ref="sceneContainer" class="scene-container"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { state } from "./Scenes";
import { loadSettings } from "./Settings";
import Start from "./Start.vue";
import Options from "./Options.vue";
import Settings from "./Settings.vue";
import { MenuScene } from "@three/MenuScene.jsx";
import Highscores from "./Highscores.vue";
import Credits from "./Credits.vue";

export default {
  name: "Menu",
  components: {
    Start,
    Options,
    Credits,
    Settings,
    Highscores,
  },
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);
    let scene: MenuScene | null = null;

    const initScene = () => {
      scene = new MenuScene(sceneContainer.value);
      scene.start();
    };

    onMounted(() => {
      loadSettings();
      initScene();
    });

    onUnmounted(() => {
      scene?.stop();
    });

    return {
      state,
      sceneContainer,
    };
  },
};
</script>

<style>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
}

.scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}

/* Общие стили для всех меню */
h1,
h2 {
  font-size: clamp(2rem, 5vw, 5rem);
  color: white;
  margin-bottom: clamp(1rem, 2vh, 2rem);
}

button,
label {
  font-size: clamp(1rem, 3vw, 3rem);
  margin: clamp(0.5rem, 1vh, 1rem) 0;
}

.menu-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
