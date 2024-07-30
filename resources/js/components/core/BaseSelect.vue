<template>
  <div class="ml-2">
    <BaseLabel
      :for="state.uniqueId"
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900"
    >
      {{ label }}
    </BaseLabel>
    <select
      :id="state.uniqueId"
      v-model="selected"
      class="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
    <ErrorMessage>{{ error }}</ErrorMessage>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import ErrorMessage from "@/components/core/ErrorMessage.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: "",
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: null,
  },
});

const state = reactive({
  uniqueId: "",
});

const emit = defineEmits(["update:modelValue"]);

const selected = ref(props.modelValue);

watch(selected, (newVal) => {
  emit("update:modelValue", newVal);
});

onMounted(() => {
  state.uniqueId = props.id || `select-${Math.random().toString(16).slice(2)}`;
});
</script>
