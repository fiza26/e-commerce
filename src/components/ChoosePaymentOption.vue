<script setup>
import { defineProps } from 'vue';
const props = defineProps(['payState', 'processPaymentState']);
</script>

<template>
    <h1 v-if="payState && !processPaymentState">Choose Payment Option</h1>
</template>