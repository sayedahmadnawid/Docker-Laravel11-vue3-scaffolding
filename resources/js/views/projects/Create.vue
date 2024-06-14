<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <Title :title="$t('project.add_project')" />
      </template>
      <form @submit.prevent="saveProject">
        <BaseInput
          type="text"
          :label="$t('project.code')"
          v-model="model.code"
          :error="errors?.code"
          readonly
        />

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

const router = useRouter();
const errors = ref({});
const model = reactive({
  code: "",
  name: "",
  name_kana: "",
  fax: "",
  phone: "",
  postalcode: "",
  prefecture: "",
  city: "",
  area: "",
  street: "",
});

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
</script>
