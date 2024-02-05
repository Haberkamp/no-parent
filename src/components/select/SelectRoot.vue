<template>
  <div class="relative">
    <input
      class="rounded border border-gray-300 px-4 py-2 w-full h-12 hover:border-gray-400"
      ref="input"
      @keydown.down="handleKeyDown"
      @keydown.up="handleKeyUp"
      @keydown.esc="isOpen = false"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, readonly, ref, nextTick } from 'vue';
import { selectInjectionKey } from './useSelectContext';

const isOpen = ref(false);

const options = ref<string[]>([]);
const focusedOptionId = ref<string | undefined>();

function registerOption(id: string) {
  options.value.push(id);
}

function unregisterOption(id: string) {
  options.value = options.value.filter((optionId) => optionId !== id);
}

function handleKeyDown() {
  isOpen.value = true;

  nextTick(() => {
    focusOption('first');
  });
}

function handleKeyUp() {
  isOpen.value = true;

  nextTick(() => {
    focusOption('last');
  });
}

function focusOption(target: 'first' | 'last' | 'next' | 'previous') {
  if (target === 'first') {
    const idOfFirstOption = options.value.at(0);
    focusedOptionId.value = idOfFirstOption;

    return;
  }

  if (target === 'last') {
    const idOfLastOption = options.value.at(-1);
    focusedOptionId.value = idOfLastOption;

    return;
  }

  const currentFocusedOption = options.value.findIndex(
    (optionId) => optionId === focusedOptionId.value
  );

  if (target === 'next') {
    const isLastOption = currentFocusedOption === options.value.length - 1;
    if (isLastOption) {
      focusOption('first');

      return;
    }

    const idOfNextOption = options.value.at(currentFocusedOption + 1);
    focusedOptionId.value = idOfNextOption;

    return;
  }

  const isFirstOption = currentFocusedOption === 0;
  if (isFirstOption) {
    focusOption('last');

    return;
  }

  const idOfPreviousOption = options.value.at(currentFocusedOption + 1);
  focusedOptionId.value = idOfPreviousOption;
}

const input = ref<HTMLInputElement | undefined>(undefined);

function close() {
  focusedOptionId.value = undefined;
  isOpen.value = false;

  if (!input.value) return;
  input.value.focus();
}

provide(selectInjectionKey, {
  isOpen: readonly(isOpen),
  idOfSelectedOption: readonly(focusedOptionId),
  registerOption,
  unregisterOption,
  focusOption,
  close,
});
</script>
