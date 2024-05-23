<template>
  <div>
    <BaseLabel
      :for="state.uniqueId"
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label }}</BaseLabel
    >
    <div class="mt-1">
      <input
        :id="state.uniqueId"
        :type="type"
        v-bind="$attrs"
        :placeholder="placeholder"
        class="block w-full rounded-md border-0 m-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        :class="{
          'border-2 border-red-600': error,
          'border-2 border-green-600': success,
          'border-2 border-blue-600': info,
          'border-2 border-yellow-400': warning,
        }"
        :value="modelValue"
        @input="updateInput"
      />
    </div>
    <FormError>{{ error }}</FormError>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  inheritAttrs: false,
};
</script>

<script setup>
import { defineProps, onMounted, reactive } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  success: Boolean,
  info: Boolean,
  warning: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  uniqueId: "",
});

const updateInput = ($event) => {
  emit("update:modelValue", $event.target.value);
};

onMounted(() => {
  state.uniqueId = props.id || Math.random().toString(16).slice(2);
});
</script>
