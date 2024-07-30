<template>
  <div class="ml-2">
    <BaseLabel
      :for="state.uniqueId"
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
    </BaseLabel>
    <VueDatePicker
      v-model="date"
      auto-apply
      :placeholder="placeholder"
      :enable-time-picker="false"
      :format="format"
      @update:modelValue="updateInput"
      locale="ja"
      class="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :class="{
        'border-2 border-red-600': error,
      }"
    />
    <ErrorMessage>{{ error }}</ErrorMessage>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import ErrorMessage from "@/components/core/ErrorMessage.vue";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref();

const format = (date) => {
  if (typeof date === "string" || typeof date === "number") {
    date = new Date(date);
  }

  if (!(date instanceof Date) || isNaN(date)) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  uniqueId: "",
});

const updateInput = (newDate) => {
  const formattedDate = format(newDate);
  emit("update:modelValue", formattedDate);
};

onMounted(() => {
  state.uniqueId = props.id || Math.random().toString(16).slice(2);
});

watch(
  () => props.modelValue,
  (newValue) => {
    date.value = new Date(newValue);
  },
);
</script>
