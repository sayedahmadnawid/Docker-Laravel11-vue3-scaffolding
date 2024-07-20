<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <Title :title="$t('project.add_project')" />
      </template>
      <form @submit.prevent="saveProject">
        <BaseInput type="text" :label="$t('project.code')" v-model="model.code" :error="errors?.code" readonly />
        <BaseInput type="text" :label="$t('project.temporary_name')" v-model="model.temporary_name"
          :placeholder="$t('project.construction_example')" :error="errors?.code" />
        <BaseInput type="text" :label="$t('project.confirmed_name')" v-model="model.confirmed_name"
          :placeholder="$t('project.construction_example')" :error="errors?.code" />
        <BaseInput type="text" :label="$t('project.short_name')" v-model="model.confirmed_name"
          :placeholder="$t('project.construction_example')" :error="errors?.code" />
        <BaseSelect :options="construction_types" :label="$t('project.construction_type')" v-model="model.type" />
        <BaseSelect :options="natures" :label="$t('project.construction_nature')" v-model="model.nature" />
        <DatePicker :placeholder="now()" :label="$t('project.construction_start_date')" v-model="model.start_date" />
        <DatePicker :placeholder="now(30)" :label="$t('project.construction_complete_date')"
          v-model="model.complete_date" />
        <BaseButton>{{ $t("project.submit") }}</BaseButton>
      </form>
    </PageComponent>

  </div>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import Title from "@/components/molecule/Title.vue";
import BaseInput from "@/components/core/BaseInput.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import store from "@/store/index.js";
import DatePicker from "@/components/core/DatePicker.vue";
import BaseSelect from "@/components/core/BaseSelect.vue";

const router = useRouter();
const errors = ref({});
const model = reactive({
  code: "",
  temporary_name: "",
  confirmed_name: "",
  short_name: "",
  type: "",
  nature: "",
  start_date: "",
  complete_date: "",
  name_kana: "",
  fax: "",
  phone: "",
  postalcode: "",
  prefecture: "",
  city: "",
  area: "",
  street: "",
});

const construction_types = [
  { value: "1", title: '公共工事' },
  { value: "2", title: '民間工事' },
  { value: "3", title: 'その他' }];

const natures = [
  { value: "10", title: "土木一式" },
  { value: "20", title: "建築一式" },
  { value: "290", title: "解体" }
]

model.code = computed(() => store.state.projects.availableCode);

onMounted(() => {
  store.dispatch("projects/generateCode");
});

function fetchAddress() {
  new YubinBangoCore(model.postalcode, function (addr) {
    model.prefecture = addr.region;
    model.city = addr.locality;
    model.area = addr.street;
  });
}

function saveProject() {
  store
    .dispatch("traders/saveProject", { ...model })
    .then(() => {
      store.commit("notify", {
        type: "success",
        title: "Project Saved!",
        message: "The project was successfully ",
      });
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

  if (typeof next === 'number' && next !== 0) {
    currentDate.setDate(currentDate.getDate() + next);
  }

  return currentDate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).replaceAll('/', '-');
}
</script>
