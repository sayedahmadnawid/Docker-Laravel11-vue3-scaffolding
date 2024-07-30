<template>
  <PageComponent>
    <template v-slot:header>
      <BaseButton class="my-2 w-32" :to="{ name: 'ProjectCreate' }">
        <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" />
        {{ $t("project.project") }}
      </BaseButton>
    </template>
  </PageComponent>
</template>
<script setup>
import { computed, onMounted } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import TraderDatatable from "@/components/datatables/TraderDatatable.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import Spinner from "@/components/molecule/Spinner.vue";
import store from "@/store/index.js";
import { useRouter } from "vue-router";

const traders = computed(() => store.state.projects.all);

const router = useRouter();
</script>
