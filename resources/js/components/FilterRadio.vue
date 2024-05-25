<template>
  <div class="ml-4 flex justify-center items-center space-x-2">
    <BaseRadio
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      v-model="selectedValue"
      @change="filter"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseRadio from "@/components/core/BaseRadio.vue";

const emit = defineEmits(["filter"]);
const selectedValue = ref("All");

const options = [
  { label: "All", value: "All" },
  { label: "Easy", value: "Easy" },
  { label: "Medium", value: "Medium" },
];

const filter = (e) => {
  emit("filter", e.target.value);
};
</script>
