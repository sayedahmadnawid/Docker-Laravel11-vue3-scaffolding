<template>
  <div class="bg-white rlative border rounded-lg">
    <div class="flex items-center justify-start">
      <!-- Search bar -->
      <SearchForm @search="handleSearch" />
      <!-- Radio buttons -->
      <FilterRadio @filter="handleRadioFilter" />

      <!-- List of filter -->
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs rext-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">name</th>
          <th class="px-4 py-3">Minutes</th>
          <th class="px-4 py-3">Cuisine</th>
          <th class="px-4 py-3">difficulty</th>
          <th class="px-4 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterItems" :key="item.id" class="border-b">
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ item.name }}</td>
          <td class="px-4 py-3">{{ item.prepTimeMinutes }}</td>
          <td class="px-4 py-3">{{ item.cuisine }}</td>
          <td class="px-4 py-3">{{ item.difficulty }}</td>
          <td class="px-4 py-3 flex items center justify-end">
            <a href="#" class="text-indigo-500 hover:underline">Details</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterRadio from "@/components//FilterRadio.vue";

const searchFilter = ref("");
const radioFilter = ref("");

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const filterItems = computed(() => {
  let items = props.items;

  switch (radioFilter.value) {
    case "Easy":
      items = items.filter((item) => item.difficulty === "Easy");
      break;

    case "Medium":
      items = items.filter((item) => item.difficulty === "Medium");
      break;
  }

  if (searchFilter.value !== "") {
    items = items.filter(
      (item) =>
        item.name.includes(searchFilter.value) ||
        item.cuisine.includes(searchFilter.value) ||
        item.difficulty.includes(searchFilter.value)
    );
  }
  return items;
});

const handleSearch = (search) => {
  searchFilter.value = search;
};

const handleRadioFilter = (filter) => {
  radioFilter.value = filter;
};
</script>
