<template>
  <div class="relative items-center px-4">
    <BaseButton @click="show = !show" :label="label" />
    <div
      v-if="show"
      class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow"
    >
      <h6 class="mb-3 text-sm font-medium text-gray-900">{{ title }}</h6>
      <ul class="space-y-2 text-sm">
        <li v-for="(item, ind) in items" :key="ind">
          <BaseCheckbox :label="item" @change="filter" :value="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/core/BaseButton.vue";
import BaseCheckbox from "@/components/core/BaseCheckbox.vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "Filter",
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["filter"]);
const show = ref(false);
const filter = (e) => {
  emit("filter", e.target.value);
};
</script>
