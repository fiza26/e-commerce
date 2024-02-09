<script setup>
import { defineProps } from 'vue';
const props = defineProps(['addressState', 'saveAddressState']);
</script>

<template>
    <button @click="$emit('saveAddress')" v-if="addressState && saveAddressState === false">
        Save Address
    </button>
</template>