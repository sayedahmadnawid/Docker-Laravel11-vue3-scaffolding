<template>
  <label
    :for="htmlFor"
    class="block text-sm font-medium text-label text-gray-800 dark:text-gray-300 truncate"
  >
    <slot></slot>
  </label>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  htmlFor: {
    type: String,
    default: "",
  },
});
</script>
