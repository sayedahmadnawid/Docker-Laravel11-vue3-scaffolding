<template>
  <Datatable :items="items" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import Datatable from "@/components/datatables/DataTable.vue";
import axiosClient from "@/plugins/axios.js";

const items = ref({});

onMounted(() => {
  const response = axiosClient
    .get("https://dummyjson.com/recipes")
    .then((res) => {
      items.value = res.data.recipes;
    });
});
</script>
