<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <!-- Search bar -->
        <SearchForm @search="handleSearch" />
        <!-- List of filter 
        <FilterDropdown
          @filter="handleCheckboxFilter"
          :items="prefectures"
          title="Prefectures"
        />-->
      </div>
    </template>
    <div class="bg-white relative border rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs rext-gray-700 uppercase bg-gray-50">
          <tr>
            <th class="px-4 py-3">{{$t('general.Id')}}</th>
            <th class="px-4 py-3">{{$t('general.name')}}</th>
            <th class="px-4 py-3">{{$t('general.name_kana')}}</th>
            <th class="px-4 py-3">{{$t('general.phone')}}</th>
            <th class="px-4 py-3">{{$t('general.fax')}}</th>
            <th class="px-4 py-3">{{$t('general.address')}}</th>
            <th class="px-4 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b">
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-4 py-3">{{ item.name_kana }}</td>
            <td class="px-4 py-3">{{ item.phone }}</td>
            <td class="px-4 py-3">{{ item.fax }}</td>
            <td class="px-4 py-3">{{ item.prefecture }}</td>
            <td class="px-4 py-3 flex items center justify-end">
              <a href="#" class="text-indigo-500 hover:underline">Details</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageComponent>
</template>

<script setup>
import { ref, computed } from "vue";
import SearchForm from "@/components/molecule/SearchForm.vue";
import FilterDropdown from "@/components/core/FilterDropdown.vue";
import PageComponent from "@/components/PageComponent.vue";

const searchFilter = ref("");
const PrefectureFilter = ref([]);

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});

const handleSearch = (search) => {
  searchFilter.value = search;
};

const handleCheckboxFilter = (filter) => {
  if (PrefectureFilter.value.includes(filter)) {
    return PrefectureFilter.value.splice(PrefectureFilter.value.indexOf(filter), -1);
  }
  return PrefectureFilter.value.push(filter);
};


</script>
