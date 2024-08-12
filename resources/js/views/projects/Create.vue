<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <Title :title="$t('project.add_project')" />
      </template>
      <Spinner v-if="projectLoading" />
      <form @submit.prevent="saveProject">
        <BaseInput
          type="text"
          :label="$t('project.code')"
          v-model="model.code"
          :error="errors?.code"
          readonly
        />
        <BaseInput
          type="text"
          :label="$t('project.temporary_name')"
          v-model="model.temporary_name"
          :placeholder="$t('project.construction_example')"
          :error="errors?.temporary_name"
        />
        <BaseInput
          type="text"
          :label="$t('project.confirmed_name')"
          v-model="model.confirmed_name"
          :placeholder="$t('project.construction_example')"
          :error="errors?.confirmed_name"
        />
        <BaseInput
          type="text"
          :label="$t('project.short_name')"
          v-model="model.short_name"
          :placeholder="$t('project.construction_example')"
          :error="errors?.short_name"
        />
        <BaseSelect
          :options="construction_types"
          :label="$t('project.construction_type')"
          v-model="model.type"
          :error="errors?.type"
          :selectedOption="model.type"
        />
        <BaseSelect
          :options="natures"
          :label="$t('project.construction_nature')"
          v-model="model.nature"
          :error="errors?.nature"
          :selectedOption="model.nature"
        />
        <DatePicker
          :placeholder="now()"
          :label="$t('project.construction_start_date')"
          v-model="model.start_date"
          :error="errors?.start_date"
        />
        <DatePicker
          :placeholder="now(30)"
          :label="$t('project.construction_complete_date')"
          v-model="model.complete_date"
          :error="errors?.complete_date"
        />
        <BaseButton>{{ $t("project.submit") }}</BaseButton>
      </form>
    </PageComponent>
  </div>
</template>
<script setup>
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import Title from "@/components/molecule/Title.vue";
import BaseInput from "@/components/core/BaseInput.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import store from "@/store/index.js";
import DatePicker from "@/components/core/DatePicker.vue";
import BaseSelect from "@/components/core/BaseSelect.vue";
import Spinner from "@/components/molecule/Spinner.vue";

const router = useRouter();
const errors = ref({});
const route = useRoute();

const projectLoading = computed(
  () => store.state.projects.currentProject.loading,
);

const model = reactive({
  code: "",
  temporary_name: "",
  confirmed_name: "",
  short_name: "",
  type: "",
  nature: "",
  start_date: "",
  complete_date: "",
});

const construction_types = [
  { value: "1", title: "公共工事" },
  { value: "2", title: "民間工事" },
  { value: "3", title: "その他" },
];

const natures = [
  { value: "10", title: "土木一式" },
  { value: "20", title: "建築一式" },
  { value: "290", title: "解体" },
];

if (route.params.id) {
  store
    .dispatch("projects/getProject", route.params.id)
    .then(() => {
      const currentProject = store.state.projects.currentProject.data;
      Object.assign(model, {
        ...currentProject,
      });
    })
    .catch((error) => {
      console.error("Error fetching project data:", error);
    });
} else {
  store.dispatch("projects/generateCode");
  model.code = computed(() => store.state.projects.availableCode);
}

async function saveProject() {
  await store
    .dispatch("projects/saveProject", { ...model })
    .then((res) => {
      if (res.config.method === "put") {
        store.commit("notify", {
          type: "info",
          title: "Project Updated!",
          message: "The Project was successfully Updated",
        });
      } else {
        store.commit("notify", {
          type: "success",
          title: "Project Saved!",
          message: "The Project was successfully added",
        });
      }
      router.push({
        name: "Projects",
      });
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}

function now(next = 0) {
  const currentDate = new Date();

  if (typeof next === "number" && next !== 0) {
    currentDate.setDate(currentDate.getDate() + next);
  }

  return currentDate
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
}
</script>
