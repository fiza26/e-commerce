<script setup>
import { defineProps } from 'vue';
const props = defineProps(['payState', 'processPaymentState']);
</script>

<template>
    <div class="payment-options" v-if="payState && !processPaymentState">
        <ul>
            <li @click="$emit('processPayment', 'indomaret')">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png" alt="" />
            </li>
            <li @click="$emit('processPayment', 'alfamart')">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/ALFAMART_LOGO_BARU.png/1200px-ALFAMART_LOGO_BARU.png"
                    alt="" />
            </li>
            <li @click="$emit('processPayment', 'bri')">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png"
                    alt="" />
            </li>
            <li @click="$emit('processPayment', 'bca')">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                    alt="" />
            </li>
            <li @click="$emit('processPayment', 'bsi')">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bank_Syariah_Indonesia.svg/1200px-Bank_Syariah_Indonesia.svg.png"
                    alt="" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
.big-card .payment-options ul li {
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 14px;
    border-radius: 15px;
    border: 1px solid #1dd1a1;
    transition: cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
    list-style: none;
}

.big-card .payment-options ul li:hover {
    background-color: #1dd1a1;
    color: white;
}

.big-card .payment-options ul li img {
    height: 50px;
}
</style>