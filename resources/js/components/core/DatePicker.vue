<template>
    <div>
        <BaseLabel v-if="label" class="block pl-3 text-sm font-medium leading-6 text-gray-900">{{
            label }}</BaseLabel>
        <VueDatePicker v-model="date" auto-apply :placeholder="placeholder" :format="format" :enable-time-picker="false"
            locale="ja" class="mx-2 my-2" />
    </div>

</template>

<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();

const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    format: {
        type: String,
        default: 'yyyy-MM-dd'
    },
    placeholder: {
        type: String,
        required: true
    }
})


</script>