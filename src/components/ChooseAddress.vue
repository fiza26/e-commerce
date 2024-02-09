<script setup>
import { defineProps } from 'vue';
const props = defineProps(['useAddressState', 'chooseAddressState', 'addressData']);
</script>

<template>
    <div class="input-address" v-if="useAddressState && chooseAddressState === false" v-for="alamat in addressData"
        :key="index">
        <p>Name : {{ alamat.name }}</p>
        <hr />
        <p>Address 1 : {{ alamat.address1 }}</p>
        <hr />
        <p>Address 2 : {{ alamat.address2 }}</p>
        <hr />
        <p>Postal Code : {{ alamat.postalCode }}</p>
        <hr />
        <p>Phone Number : {{ alamat.phoneNumber }}</p>
        <hr />
        <button class="saved-address" @click="$emit('chooseAddress', alamat)">
            Choose Address
        </button>
        <button class="saved-address" @click="$emit('deleteAddress', alamat)">
            Delete Address
        </button>
    </div>
</template>

<style scoped>
.big-card .input-address {
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    background-color: #dddd;
    padding: 7px;
    border-radius: 15px;
}

.big-card .input-address input {
    font-family: "Poppins", sans-serif;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 15px;
    border: none;
    padding: 7px;
}

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

.big-card .saved-address {
    background-color: #1dd1a1;
    color: white;
}
</style>