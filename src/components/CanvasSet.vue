<template>
  <div class="relative flex justify-center mt-8">
    <div class="p-4 border shadow hidden">
      <canvas ref="original"></canvas>
    </div>
    <div class="p-4 border shadow" v-show="store.state.view === 'color'">
      <canvas ref="color"></canvas>
    </div>
    <div class="p-4 border shadow" v-show="store.state.view === 'bw'">
      <canvas ref="bw"></canvas>
    </div>
    <div class="p-4 border shadow" v-show="store.state.view === 'onebit'">
      <canvas ref="onebit"></canvas>
    </div>
    <div class="absolute mx-auto my-auto">
      <button
        class="border m-2 p-4 rounded bg-yellow-700 text-white"
        @click="onPickFile"
      >
        File Upload
      </button>
      <input
        class="hidden"
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="onFilePicked"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "../store.js";

// File Input
const fileInput = ref(null);

// Canvas Refs
const original = ref(null);
const color = ref(null);
const bw = ref(null);
const onebit = ref(null);

// Canvas Set
let canvasSet = [];

// Init Canvas Set
onMounted(() => {
  canvasSet = [
    {
      id: "original",
      canvas: original.value,
    },
    {
      id: "color",
      canvas: color.value,
    },
    {
      id: "bw",
      canvas: bw.value,
    },
    {
      id: "onebit",
      canvas: onebit.value,
    },
  ];
});

function updateCanvasProperty(prop, value) {
  canvasSet.forEach((c) => (c.canvas[prop] = value));
}

function drawImage(img) {
  canvasSet.forEach((c) => {
    const ctx = c.canvas.getContext("2d");
    store.contexts[c.id] = ctx;
    ctx.drawImage(img, 0, 0);
  });
}

function onPickFile() {
  fileInput.value.click();
}

function onFilePicked(event) {
  const img = new Image();

  img.onload = function loaded() {
    // Set Height and Width
    store.setCanvasDimensions(this.width, this.height);
    updateCanvasProperty("width", this.width);
    updateCanvasProperty("height", this.height);

    // Draw Initial Image
    drawImage(this);

    // Set Loaded
    store.setImageLoaded(true);

    // Process
    store.process();
  };

  img.onerror = function error() {
    console.error("The provided file couldn't be loaded as an Image media");
  };
  img.src = URL.createObjectURL(event.target.files[0]);
}
</script>