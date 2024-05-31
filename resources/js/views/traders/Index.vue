<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <BaseButton class="my-2 w-32" :to="{ name: 'TraderCreate' }">
          <PlusIcon class="mx-1 h-5 w-5" aria-hidden="true" /> Trader
        </BaseButton>
      </template>
      <!-- -->
    </PageComponent>
  </div>
</template>
<script setup>
import PageComponent from "@/components/PageComponent.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/20/solid";
</script>
