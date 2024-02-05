<template>
  <li
    :class="classNames"
    ref="option"
    tabindex="-1"
    @keydown.down="context.focusOption('next')"
    @keydown.up="context.focusOption('next')"
    @keydown.esc="context.close()"
  >
    <slot></slot>
  </li>
</template>

<script setup lang="ts">
import { createId } from '@paralleldrive/cuid2';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useSelectContext } from './useSelectContext';

const id = createId();
const option = ref<HTMLElement | undefined>(undefined);

const context = useSelectContext();

watch(context.idOfSelectedOption, (value) => {
  const elementIsSelected = value === id;
  if (!elementIsSelected || !option.value) return;

  option.value.focus();
});

onMounted(() => {
  context.registerOption(id);
});

onUnmounted(() => {
  context.unregisterOption(id);
});

const classNames = computed(() => ({
  'py-1 px-2 rounded cursor-pointer': true,
  'bg-gray-100': context.idOfSelectedOption.value === id,
  'after:absolute relative after:-left-2 after:top-0 after:bottom-0 after:bg-blue-600 after:h-full after:w-1 after:rounded-r font-medium':
    false,
}));

useSelectContext();
</script>
