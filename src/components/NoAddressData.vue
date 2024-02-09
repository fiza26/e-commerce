<script setup>
import { defineProps } from 'vue';
const props = defineProps(['useAddressState', 'addressData']);
</script>

<template>
    <h1 v-if="useAddressState && addressData.length === 0">No data</h1>
</template>

