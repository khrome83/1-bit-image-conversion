<template>
  <div
    v-if="store.state.palletsLoaded"
    class="my-1 grid grid-flow-col grid-rows-3 gap-2 xl:flex flex-col"
  >
    <PalletTile
      v-for="blueprint in store.blueprints"
      :key="blueprint.id"
      :id="blueprint.id"
      :percent="blueprint.dark"
      :src="blueprint.src"
      :selected="blueprint.selected"
    />
    <div class="p-0.5 xl:hidden"></div>
  </div>
  <div v-else class="">Loading...</div>
</template>

<script setup>
import { onMounted } from "vue";
import store from "../store.js";
import PalletTile from "./PalletTile.vue";

onMounted(() => {
  for (let i = 0; i < store.patternCount; i++) {
    // Build Canvas
    const canvas = document.createElement("canvas");
    canvas.id = `pattern-${i}`;
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    // Fill Pattern
    const imageObj = new Image();
    imageObj.onload = function () {
      const pattern = ctx.createPattern(imageObj, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 100, 100);

      const imageData = ctx.getImageData(0, 0, 100, 100);
      const data = imageData.data;
      let count = 0;

      for (let x = 0; x < data.length; x += 4) {
        let total = data[x] + data[x + 1] + data[x + 2];
        if (total === 0) count++;
      }

      // How Dark Is It
      const dark = count / 100;

      // Select Default Blueprints
      const selected = i < 5;

      // Define Source Path
      const src = `patterns/${i}.png`;

      // Install Canvas for default Blueprints
      if (selected) {
        store.addPalletSelection(i, src, dark);
      }

      // Install Blueprints
      store.blueprints.push({
        id: i,
        src,
        dark,
        selected,
      });

      // Sort and Mark as Loaded
      if (store.blueprints.length === store.patternCount) {
        store.blueprints.sort((a, b) => a.dark - b.dark);
        store.setPalletsLoaded(true);
      }
    };

    imageObj.src = `patterns/${i}.png`;
  }
});
</script>