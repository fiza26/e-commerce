<script setup>
import { defineProps } from 'vue';
const props = defineProps(['chooseAddressState', 'payState', 'selectedAddress']);
</script>

<template>
    <div class="input-address" v-if="chooseAddressState && payState === false">
        <p>Name : {{ selectedAddress.name }}</p>
        <hr />
        <p>Address 1 : {{ selectedAddress.address1 }}</p>
        <hr />
        <p>Address 2 : {{ selectedAddress.address2 }}</p>
        <hr />
        <p>Postal Code : {{ selectedAddress.postalCode }}</p>
        <hr />
        <p>Phone Number : {{ selectedAddress.phoneNumber }}</p>
        <hr />
    </div>
</template>

