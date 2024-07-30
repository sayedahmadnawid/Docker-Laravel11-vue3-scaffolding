<template>
  <div
    class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
  >
    <div class="max-w-8xl mx-auto py-6 px-2 sm:px-6 lg:px-8">
      <h1 v-if="title" class="text-xl font-bold text-gray-900">
        {{ title }}
      </h1>
      <slot name="header"></slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>
