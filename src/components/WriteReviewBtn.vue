<script setup>
import { defineProps } from 'vue';
const props = defineProps(['reviewExisted']);
</script>

<template>
    <button @click="$emit('writeReviewState')" v-if="!reviewExisted">
        Write Review
      </button>
</template>

