<template>
  <PageComponent>
    <template v-slot:header>
      <BaseButton class="my-2 w-[200px]" :to="{ name: 'ProjectCreate' }">
        <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" />
        {{ $t("project.project") }}
      </BaseButton>
    </template>
    <div class="mb-5">
      <input v-model="params.search" type="text" class="form-input max-w-xs" placeholder="Search..." />
    </div>
    <!--  <vue3-datatable :rows="rows" :columns="cols" :loading="loading" :sortable="true" :sortColumn="params.sort_column"
      :sortDirection="params.sort_direction" /> -->

    <vue3-datatable :rows="rows" :columns="cols" :loading="projects.loading" :totalRows="total_rows"
      :isServerMode="true" :pageSize="params.pagesize" :search="params.search" @change="changeServer" />
  </PageComponent>
</template>
<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import store from "@/store/index.js";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

const projects = computed(() => store.state.projects.all);

const rows = computed(() => {
  return projects.value.data ? projects.value.data : [];
});
const total_rows = ref(0);
const loading = ref(true);

onMounted(() => {
  store.dispatch("projects/getProjects");
  rows.value = projects.value.data;
  total_rows.value = store.state.projects.all.projectsMetaData.total;
});

const params = reactive({
  current_page: 1,
  pagesize: 10,
  search: '',
  column_filters: [],
});

const changeServer = (data) => {
  params.column_filters = data.column_filters;
  params.current_page = data.current_page
  params.search = data.search;
  store.dispatch("projects/getProjects", { page: params.current_page, limit: params.pageSize });

  if (data.change_type === 'search') {
    filterUsers();
  } else {
    store.dispatch("projects/getProjects", { page: params.current_page, limit: params.pageSize });
  }
};

let timer = 0;

const filterUsers = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    store.dispatch("projects/getProjects", { page: params.current_page, limit: params.pageSize });
  }, 300);
};

const cols =
  ref([
    { field: "code", title: "code", width: "90px", filter: false },
    { field: "temporary_name", title: "Temporary Name" },
    { field: "confirmed_name", title: "Confiremd_name" },
    { field: "short_name", title: "Short Name" },

    { field: "start_date", title: "Start Date", type: 'date'  },
  ]) || [];

</script>