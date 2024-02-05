<template>
  <ul
    v-if="isOpen"
    class="absolute shadow-sm border rounded border-gray-300 p-2 w-full"
    style="top: calc(100% + 0.5rem)"
  >
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { useSelectContext } from './useSelectContext';

const { isOpen } = useSelectContext();
</script>
