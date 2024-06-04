<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <BaseButton class="my-2 w-32" :to="{ name: 'TraderCreate' }">
          <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" /> Trader
        </BaseButton>
      </template>
      <Spinner v-if="traders.loading" />
      <TraderDatatable v-else-if="traders.data.length" :items="traders.data" />
    </PageComponent>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import TraderDatatable from "@/components/datatables/TraderDatatable.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
import Spinner from "@/components/molecule/Spinner.vue";
import store from "@/store/index.js";

const traders = computed(() => store.state.traders.all);
onMounted(() => {
  store.dispatch("traders/getTraders");
});
</script>