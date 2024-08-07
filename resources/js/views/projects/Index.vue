<template>
  <PageComponent>
    <template v-slot:header>
      <BaseButton class="my-2 w-[200px]" :to="{ name: 'ProjectCreate' }">
        <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" />
        {{ $t("project.project") }}
      </BaseButton>
    </template>
    <div class="mb-5">
      <input
        v-model="params.search"
        type="text"
        class="form-input max-w-xs rounded-md border-0 m-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300"
        placeholder="Search..."
      />
    </div>

    <vue3-datatable
      :rows="rows"
      :columns="cols"
      :loading="projects.loading"
      :totalRows="total_rows"
      :isServerMode="true"
      :pageSize="params.pagesize"
      :search="params.search"
      @change="changeServer"
    />
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

let controller = "";
let timer = "";

const params = reactive({
  current_page: 1,
  pageSize: 10,
  search: "",
  column_filters: [],
});

const cols =
  ref([
    { field: "code", title: "code", width: "90px", filter: false },
    { field: "temporary_name", title: "Temporary Name" },
    { field: "confirmed_name", title: "Confiremd_name" },
    { field: "short_name", title: "Short Name" },
    { field: "start_date", title: "Start Date", type: "date" },
  ]) || [];

onMounted(() => {
  getProjects();
});

const getProjects = () => {
  try {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    projects.loading = true;

    store.dispatch("projects/getProjects", {
      page: params.current_page,
      limit: params.pageSize,
      search: params.search,
      column_filters: params.column_filters,
    });
    rows.value = projects.value.data;
    total_rows.value = store.state.projects.all.projectsMetaData.total;
  } catch {}
  projects.loading = false;
};

const changeServer = (data) => {
  params.column_filters = data.column_filters;
  params.current_page = data.current_page;
  params.search = data.search;
  params.pageSize = data.pagesize;
  getProjects();
  if (data.change_type === "search") {
    filterProjects();
  } else {
    getProjects();
  }
};

const filterProjects = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    getProjects();
  }, 300);
};
</script>
