<script setup>
import { defineProps } from 'vue';

const props = defineProps(['filteredItems']);

</script>

<template>
    <div class="container">
        <h1 v-if="filteredItems.length === 0">No Data</h1>
        <div class="card-wrapper" v-for="item in filteredItems" :key="item.id">
            <div class="card-image">
                <img :src="item.image" alt="" />
            </div>
            <hr />
            <div class="card-content">
                <p>{{ item.name }}</p>
                <p>{{ item.price }}</p>

                <RouterLink :to="`/ProductDetails/${item.id}`"><button>More Details</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: white;
    padding: 10px;
    margin: 15px;
}

.container h1 {
    color: black;
}

.card-wrapper {
    background-color: white;
    color: black;
    width: 300px;
    height: 350px;
    border-radius: 15px;
    border: 2px solid #1dd1a1;
    box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
    margin: 15px;
    cursor: pointer;
    overflow: hidden;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
}

.card-image {
    height: 230px;
    overflow: hidden;
}

hr {
    border: 1px solid #1dd1a1;
}

.card-image img {
    height: 100%;
    /* Use 100% to maintain aspect ratio */
    width: 100%;
    /* Use 100% to maintain aspect ratio */
    object-fit: cover;
    /* Maintain aspect ratio and cover the container */
    transform: scale(1);
    transition: ease-in-out 0.5s;
}

.card-image img:hover {
    transform: scale(1.2);
}

.card-content {
    padding: 10px;
}

.card-content button {
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

.card-content button:hover {
    border: none;
    background-color: #1dd1a1;
    color: white;
}

.card-content a {
    text-decoration: none;
    color: black;
}
</style>