<template>
  <div
    class="
      relative
      flex flex-row
      p-1
      rounded
      shadow
      bg-indigo-600
      hover:bg-blue-500
      hover:shadow-lg
      cursor-pointer
      items-center
      justify-items-center
      w-[14rem]
    "
    @click="toggle(id)"
  >
    <canvas class="rounded" ref="canvas" width="140" height="32"></canvas>
    <div
      class="
        absolute
        top-0
        left-0
        m-2
        text-green-400
        bg-white
        rounded-full
        shadow
      "
      v-show="state.selected"
    >
      <CheckCircleIcon class="h-6 w-6" aria-hidden="true" />
    </div>
    <div class="flex-1 ml-2 text-white text-xs font-bold text-center">
      {{ percent }}%
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { CheckCircleIcon } from "@heroicons/vue/solid";
import store from "../store.js";

const props = defineProps({
  id: Number,
  percent: Number,
  src: String,
  selected: Boolean,
});

const state = reactive({ selected: props.selected });

function toggle(id) {
  store.togglePalletSelection(id);
  state.selected = !state.selected;
}

const canvas = ref(null);

onMounted(() => {
  const element = canvas.value;
  const ctx = element.getContext("2d");
  const imageObj = new Image();
  imageObj.onload = function () {
    const pattern = ctx.createPattern(imageObj, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, element.width, element.height);
  };

  imageObj.src = props.src;
});
</script>