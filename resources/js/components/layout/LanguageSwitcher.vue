<template>
  <BaseDropdown :options="LOCALS" v-model="locale" />
</template>

<script setup>
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import {
  SUPPORT_LOCALES as supportLocales,
  setI18nLanguage,
  LOCALS,
} from "@/i18n.js";
import BaseDropdown from "@/components/core/BaseDropdown.vue";

const { locale } = useI18n({ useScope: "global" });
watch(locale, (val) => {
  setI18nLanguage(val);
});
</script>
