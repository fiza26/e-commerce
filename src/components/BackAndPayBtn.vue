<script setup>
import { defineProps } from 'vue';
const props = defineProps(['payState', 'useAddressState', 'saveAddressState', 'chooseAddressState', 'addressData']);
</script>

<template>
    <div v-if="payState === false">
        <button v-if="useAddressState || saveAddressState" @click="$emit('backNewAddress')">
            Back
        </button>
        <button v-if="saveAddressState || useAddressState && chooseAddressState" :disabled="addressData.length < 1"
            @click="$emit('pay')">
            Pay
        </button>
    </div>
</template>

<style scoped>
.big-card button {
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    border: none;
    border: 1px solid #1dd1a1;
    margin-top: 10px;
    background-color: white;
    cursor: pointer;
    transition: cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
}

.big-card button:hover {
    border: none;
    background-color: #1dd1a1;
    color: white;
}
</style>
