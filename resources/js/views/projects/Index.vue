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
        v-model="store.state.projects.params.search"
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
      :pageSize="store.state.projects.params.pageSize"
      :search="store.state.projects.params.search"
      @change="changeServer"
    >
      <template #action="data">
        <div class="flex gap-1">
          <button
            class="flex items-center justify-center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] text-white rounded bg-[#ea4c89]"
            type="button"
          >
            <DocumentMagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            class="flex items-center justify-center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] text-white rounded bg-[#1DA1F2]"
            type="button"
          >
            <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            class="flex items-center justify-center disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[40px] h-8 max-h-[40px] text-white rounded bg-[#ea4335]"
            type="button"
            @click="deleteProject(data.value.id)"
          >
            <TrashIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </template>
    </vue3-datatable>
  </PageComponent>
</template>
<script setup>
import { computed, onMounted, ref, reactive } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import store from "@/store/index.js";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import { useRouter } from "vue-router";
import "@bhplugin/vue3-datatable/dist/style.css";
import {
  TrashIcon,
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();

const projects = computed(() => store.state.projects.all);

const rows = computed(() => {
  return projects.value.data ? projects.value.data : [];
});
const total_rows = ref(0);

const cols =
  ref([
    { field: "code", title: "code", width: "90px", filter: false },
    { field: "temporary_name", title: "Temporary Name" },
    { field: "confirmed_name", title: "Confiremd_name" },
    { field: "short_name", title: "Short Name" },
    { field: "start_date", title: "Start Date", type: "date" },
    { field: "action", title: "Action" },
  ]) || [];

onMounted(() => {
  getProjects();
});

const getProjects = () => {
  try {
    projects.loading = true;
    store.dispatch("projects/getProjects");
    rows.value = projects.value.data;
    total_rows.value = store.state.projects.all.projectsMetaData.total;
  } catch {}
  projects.loading = false;
};

const changeServer = (data) => {
  store.dispatch("projects/updateParams", {
    current_page: data.current_page,
    pageSize: data.pagesize,
    search: data.search,
    column_filters: data.column_filters,
  });

  if (data.change_type === "search") {
    filterProjects();
  } else {
    getProjects();
  }
};

const filterProjects = () => {
  setTimeout(() => {
    getProjects();
  }, 300);
};

const deleteProject = (projectId) => {
  if (
    confirm(
      `Are you sure you want to delete this Project? Operation can't be undone!!`,
    )
  ) {
    store.dispatch("projects/deleteProject", projectId).then(() => {
      store.commit("notify", {
        type: "danger",
        title: "Project Removed!",
        message: "The project was successfully Removed",
      });
      router.push({
        name: "Projects",
      });
    });
  }
};
</script>
