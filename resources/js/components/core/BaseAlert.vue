<template>
  <div 
  class="rounded-md  p-4"
  :class="{
    'bg-green-100': type === 'success',
    'bg-red-100': type === 'error',
  }"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon
          v-if="type === 'error'"
          class="h-5 w-5 text-red-400"
          aria-hidden="true"
        />
        <CheckCircleIcon
          v-else-if="type === 'success'"
          class="h-5 w-5 text-green-400"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          {{ title }}
        </h3>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon, CheckCircleIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  type: {
    type: String,
    default: "error",
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});
</script>
