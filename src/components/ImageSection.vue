<script setup>
import { defineProps } from 'vue';
const props = defineProps(['product']);
</script>

<template>
  <div class="image-section">
    <img :src="product.image" alt="" />
  </div>
</template>

<style scoped>
.big-card .image-section {
  width: 400px;
}

.big-card .image-section img {
  height: 100%;
  /* Use 100% to maintain aspect ratio */
  width: 100%;
  /* Use 100% to maintain aspect ratio */
  object-fit: cover;
  /* Maintain aspect ratio and cover the container */
  transform: scale(1);
  transition: ease-in-out 0.5s;
  border-right: 1px solid #1dd1a1;
}

.big-card .image-section img:hover {
  transform: scale(1.2);
  transition: ease-in-out 0.5s;
}</style>