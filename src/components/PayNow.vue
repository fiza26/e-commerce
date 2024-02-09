<script setup>
import { defineProps } from 'vue';
const props = defineProps(['indomaretState', 'alfamartState', 'briState', 'bcaState', 'bsiState', 'computedTotalCartPrice', 'processPaymentState']);
</script>

<template>
    <div class="payNow">
        <p v-if="indomaretState">Show this code to the Indomaret cashier
        <h2>10329329232</h2>
        <h2>You need to pay this exact amount : {{ computedTotalCartPrice }}</h2>
        </p>
        <p v-if="alfamartState">Show this code to the Alfamart cashier
        <h2>30229629232</h2>
        <h2>You need to pay this exact amount : {{ computedTotalCartPrice }}</h2>
        </p>
        <p v-if="briState">Test</p>
        <p v-if="bcaState">Test</p>
        <p v-if="bsiState">Test</p>
        <button v-if="processPaymentState">I Paid It</button>
    </div>
</template>
