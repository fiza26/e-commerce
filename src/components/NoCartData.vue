<script setup>
import { defineProps } from 'vue';
const props = defineProps(['cartData']);
</script>

<template>
    <h1 v-show="cartData.length === 0">No Data</h1>
</template>
