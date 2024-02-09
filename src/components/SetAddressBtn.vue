<script setup>
import { defineProps } from 'vue';
const props = defineProps(['saveAddressState', 'addressState', 'useAddressState']);
</script>

<template>
    <button @click="$emit('setAddress')" v-if="!saveAddressState && !addressState && !useAddressState">
        Set Address
    </button>
</template>
