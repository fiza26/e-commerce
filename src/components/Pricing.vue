<script setup>
import { defineProps } from 'vue';
const props = defineProps(['cart', 'payState', 'computedTotalCartPrice']);
</script>

<template>
    <div class="pricing" v-if="cart.length > 0 && payState === false">
        <h3>Total Price: {{ computedTotalCartPrice }}</h3>
    </div>
</template>

<style scoped>
.big-card .pricing {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}
</style>