<template>
    <h4 class="text-xl font-bold dark:text-white leading-3">{{ title }}</h4>
</template>
<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>