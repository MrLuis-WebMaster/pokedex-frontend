<script setup lang="ts">
import { Pokemon } from '../../types/pokemon.types';

const props = defineProps<Pokemon>();

const colors: Record<string, string> = {
  red: '255, 99, 40',
  green: '144, 238, 144',
  blue: '173, 216, 230',
  yellow: '255, 255, 153',
  brown: '188, 143, 143',
  purple: '128, 0, 128',
  gray: '128, 128, 128',
  pink: '255, 192, 203',
  white: '255, 255, 255',
};
</script>

<template>
  <div
    class="border h-72 shadow rounded p-6 relative background-opacity card-pokemon"
    :style="`--bg-color:${colors[props.color]}`"
  >
    <span class="absolute left-3 top-3 font-medium">#{{ props.idPokemon }}</span>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.idPokemon}.svg`"
      :alt="props.color"
      class="h-48 w-48 mx-auto object-contain drop-shadow"
    />
    <h5
      class="text-xl uppercase text-center mt-3 font-semibold truncate text-color"
      :style="`--text-color:${colors[props.color]}`"
    >
      {{ props.name }}
    </h5>
  </div>
</template>

<style scoped>
.card-pokemon {
  z-index: 1;
}
.card-pokemon:hover {
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  transform: scale(1.1);
}
.background-opacity {
  background-color: rgba(var(--bg-color), 0.15);
}
.background-opacity:hover {
  background-color: rgba(var(--bg-color), 1);
  z-index: 10;
}
.text-color {
  color: rgba(var(--text-color), 1);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.background-opacity:hover .text-color {
  color: #101010;
}
</style>
