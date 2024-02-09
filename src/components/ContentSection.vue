<script setup>
import { defineProps } from 'vue';
const props = defineProps(['payState', 'cart']);
</script>

<template>
    <ul v-if="payState === false">
        <li v-for="item in cart" :key="item.id" class="content">
            <div class="img-section">
                <img :src="item.image" />
            </div>
            <div class="data-section">
                <p>{{ item.name }}</p>
                <p>Quantity: {{ item.quantity }}</p>
                <p>Price: {{ item.price }}</p>
                <button @click="$emit('removeItem', item.id)">Remove</button>
            </div>
        </li>
    </ul>
</template>

<style scoped>
.big-card ul li {
    text-decoration: none;
    list-style: none;
}

.big-card .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #dddd;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
}

.content .img-section img {
    width: 100px;
    border-radius: 15px;
    transition: cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
}

.content .img-section img:hover {
    width: 200px;
    object-fit: cover;
}

.content .data-section button {
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    border: none;
    border: 1px solid #1dd1a1;
    margin-top: 10px;
    background-color: #dddd;
    cursor: pointer;
    transition: cubic-bezier(0.25, 1, 0.5, 1) 0.5s;
}

.content .data-section button:hover {
    border: none;
    background-color: #1dd1a1;
    color: white;
}
</style>