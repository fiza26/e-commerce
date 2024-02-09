<script setup>
import { defineProps } from 'vue';
const props = defineProps(['saveAddressState', 'name', 'address1', 'address2', 'postalCode', 'phoneNumber']);
</script>

<template>
    <div class="input-address" v-if="saveAddressState">
        <p>Name : {{ name }}</p>
        <hr />
        <p>Address 1 : {{ address1 }}</p>
        <hr />
        <p>Address 2 : {{ address2 }}</p>
        <hr />
        <p>Postal Code : {{ postalCode }}</p>
        <hr />
        <p>Phone Number : {{ phoneNumber }}</p>
        <hr />
    </div>
</template>
