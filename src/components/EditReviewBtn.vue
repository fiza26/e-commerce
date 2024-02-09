<script setup>
import { defineProps } from 'vue';
const props = defineProps(['editReviewAction']);
</script>

<template>
    <button @click="$emit('editReview')" v-if="editReviewAction">Submit Review</button>
</template>

