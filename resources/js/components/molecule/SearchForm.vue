<template>
  <BaseInput
    type="text"
    @input="search"
    placeholder="Search"
    class="bg-gray-50 hover:bg-white"
  />
</template>
<script setup>
import BaseInput from "@/components/core/BaseInput.vue";
const emit = defineEmits(["search"]);

const search = (ev) => {
  emit("search", ev.target.value);
};
</script>
