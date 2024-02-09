<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import data from "./data.json";

import ImageSection from "../components/ImageSection.vue";
import DataSection from "../components/DataSection.vue";
import UserReview from "../components/UserReview.vue";
import WriteReviewBtn from "../components/WriteReviewBtn.vue";
import SubmitReviewBtn from "../components/SubmitReviewBtn.vue";
import EditReviewBtn from "../components/EditReviewBtn.vue";

const route = useRoute();
const id = computed(() => route.params.id);
const product = computed(() => {
  return data.find((item) => item.id === parseInt(id.value));
});

const quantity = ref(1);

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const cartNotif = ref(false);

const tutup = () => {
  cartNotif.value = false;
};

const addToCart = () => {
  cartNotif.value = true;
  const item = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    quantity: quantity.value,
    image: product.value.image,
  };

  // Check if the item already exists in the cart
  const existingItem = cart.value.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    // If the item already exists, update its quantity
    existingItem.quantity += item.quantity;
  } else {
    // If it's a new item, add it to the cart
    cart.value.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart.value));

  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

// Compute the total price of items in the cart
const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

const writeReviewButton = ref(false);
const writeReviewField = ref(false);

const writeReviewState = () => {
  writeReviewButton.value = true;
  writeReviewField.value = !writeReviewField.value;
};

const review = ref();
const reviewData = ref(JSON.parse(localStorage.getItem("review")) || []);

const submitReview = () => {
  const reviewItem = {
    id: Date(),
    review: review.value,
    productId: id.value,
  };
  reviewData.value.push(reviewItem);
  localStorage.setItem("review", JSON.stringify(reviewData.value));
};

const filteredReviews = computed(() => {
  return reviewData.value.filter(
    (reviewItem) => reviewItem.productId === id.value
  );
});

const editReviewAction = ref(false);

onBeforeMount(() => {
  if (filteredReviews.value.length > 0) {
    review.value = filteredReviews.value[0].review;
  } else {
    review.value = "";
  }
});

const editReview = () => {
  editReviewAction.value = !editReviewAction.value;

  const index = filteredReviews.value.findIndex(
    (r) => r.productId === id.value
  );
  if (index !== -1) {
    filteredReviews.value[index].review = review.value;
    localStorage.setItem("review", JSON.stringify(reviewData.value));
  }
};

const deleteReview = (reviewId) => {
  const indexToRemove = reviewData.value.findIndex(
    (item) => item.id === reviewId
  );

  if (indexToRemove !== -1) {
    reviewData.value.splice(indexToRemove, 1);

    localStorage.setItem("review", JSON.stringify(reviewData.value));
  }
};

const reviewExisted = computed(() => {
  const existed = filteredReviews.value.length > 0;
  console.log("Review Existed:", existed);
  return existed;
});

const updateQuantity = (newQuantity) => {
  quantity.value = newQuantity;
};

</script>

<template>
  <div class="container">
    <div class="big-card">
      <ImageSection :product="product" />
      <DataSection :product="product" :cartNotif="cartNotif" :quantity="quantity" @closeNotif="tutup"
        @updateQuantity="updateQuantity" @addToCart="addToCart" />
    </div>
    <div class="big-card-two">
      <UserReview :filteredReviews="filteredReviews" @editReview="editReview" @deleteReview="deleteReview" />
      <WriteReviewBtn @writeReviewState="writeReviewState" :reviewExisted="reviewExisted" />
      <textarea v-if="writeReviewField && !reviewExisted" v-model="review" name="" id="" rows="10"
        placeholder="Write your review here..."></textarea>
      <SubmitReviewBtn @submitReview="submitReview" :writeReviewField="writeReviewField" :reviewExisted="reviewExisted" />
      <textarea v-if="editReviewAction" v-model="review" name="" id="" rows="10"
        placeholder="Write your review here..."></textarea>
      <EditReviewBtn @editReview="editReview" :editReviewAction="editReviewAction" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  margin: 15px;
}

.big-card {
  display: flex;
  background-color: white;
  color: black;
  width: 1000px;
  height: 400px;
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

.big-card-two {
  background-color: white;
  color: black;
  width: 1000px;
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
  padding: 10px;
}

.big-card-two button {
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

.big-card-two button:hover {
  background-color: #1dd1a1;
  color: white;
}

.big-card-two textarea {
  font-family: "Poppins", sans-serif;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 15px;
  border: 1px solid #1dd1a1;
}

@media screen and (max-width: 768px) {
  .big-card {
    display: flex;
    flex-wrap: wrap;
    height: 700px;
  }
}
</style>
