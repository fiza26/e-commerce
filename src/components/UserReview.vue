<script setup>
import { defineProps } from 'vue';
const props = defineProps(['filteredReviews']);

</script>

<template>
  <div class="user-review" v-for="allReview in filteredReviews" :key="allReview.id">
    <div class="user-profile">
      <div class="img-name">
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
        <h4>User</h4>
      </div>
      <div class="action-button">
        <span @click="$emit('editReview', 'allReview.id')">Edit</span>
        <span @click="$emit('deleteReview', allReview.id)">Delete</span>

      </div>
    </div>
    <p>
      {{ allReview.review }}
    </p>
  </div>
</template>

<style scoped>
.big-card-two .user-review {
  background-color: #dddd;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 15px;
}

.big-card-two .user-review .user-profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.big-card-two .user-review .user-profile .img-name {
  display: flex;
  align-items: center;
}

.big-card-two .user-review .user-profile img {
  width: 50px;
  border: 1px solid #1dd1a1;
  border-radius: 50px;
  margin-right: 10px;
}

.big-card-two .user-review span {
  background-color: #1dd1a1;
  color: white;
  width: 80px;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 15px;
  text-align: center;
  float: left;
}

@media screen and (max-width: 768px) {
  .big-card {
    display: flex;
    flex-wrap: wrap;
    height: 700px;
  }

  .big-card-two .user-review .user-profile .img-name {
    display: flex;
    flex-direction: column;
  }
}
</style>