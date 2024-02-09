<script setup>
import { defineProps } from 'vue';
const props = defineProps(['writeReviewField', 'reviewExisted']);
</script>

<template>
    <button @click="$emit('submitReview')" v-if="writeReviewField && !reviewExisted">
        Submit Review
    </button>
</template>

