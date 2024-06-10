<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <BaseButton class="my-2 w-32" :to="{ name: 'TraderCreate' }">
          <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" /> Trader
        </BaseButton>
      </template>
      <Spinner v-if="traders.loading" />
      <TraderDatatable
        v-else-if="traders.data.length"
        :items="traders.data"
        @delete="deleteTrader"
      />
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
import { useRouter } from "vue-router";

const traders = computed(() => store.state.traders.all);

const router = useRouter();

onMounted(() => {
  store.dispatch("traders/getTraders");
});

function deleteTrader(traderId) {
  if (
    confirm(
      `Are you sure you want to delete this Trader? Operation can't be undone!!`
    )
  ) {
    store.dispatch("traders/deleteTrader", traderId).then(() => {
      store.commit("notify", {
        type: "danger",
        title: "Trader Removed!",
        message: "The Trader was successfully Removed",
      });
      router.push({
        name: "Traders",
      });
    });
  }
}
</script>
