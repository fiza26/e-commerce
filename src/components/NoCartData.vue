<script setup>
import { defineProps } from 'vue';
const props = defineProps(['cart']);
</script>

<template>
    <h1 v-show="cart.length === 0">No Data</h1>
</template>
