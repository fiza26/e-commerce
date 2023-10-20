<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import data from "./data.json";

const route = useRoute();
const id = computed(() => route.params.id);
const product = computed(() => {
  return data.find((item) => item.id === parseInt(id.value));
});

const quantity = ref(1);

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const cartNotif = ref(false);

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
  }
  reviewData.value.push(reviewItem);
  localStorage.setItem("review", JSON.stringify(reviewData.value));
};

const filteredReviews = computed(() => {
  return reviewData.value.filter((reviewItem) => reviewItem.productId === id.value);
});

</script>

<template>
  <div class="container">
    <div class="big-card">
      <div class="image-section">
        <img :src="product.image" alt="" />
      </div>
      <div class="data-section">
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <p v-if="cartNotif === true">{{ quantity }} Item added to the cart</p>
        <input type="number" v-model="quantity" placeholder="Quantity" />
        <button @click="addToCart">Add to Cart</button>
        <RouterLink
          :to="{
            name: 'Checkout',
            params: {
              id: product.id,
              quantity: quantity,
              price: product.price,
            },
            query: {
              cart: JSON.stringify(cart),
              totalCartPrice: totalCartPrice,
            },
          }"
        >
          <button>Checkout</button>
        </RouterLink>
      </div>
    </div>
    <div class="big-card-two">
      <div class="user-review" v-for="allReview in filteredReviews" :key="allReview.id">
        <div class="user-profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
            alt=""
          />
          <h4>Fiza Ahmad Baizuri</h4>
        </div>
        <p>
          {{ allReview.review }}
        </p>
      </div>
      <button @click="writeReviewState">Write Review</button>
      <textarea
        v-if="writeReviewField"
        v-model="review"
        name=""
        id=""
        rows="10"
        placeholder="Write your review here..."
      ></textarea>
      <button @click="submitReview" v-if="writeReviewField">Submit Review</button>
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
.big-card .image-section {
  width: 400px;
}
.big-card .image-section img {
  height: 100%; /* Use 100% to maintain aspect ratio */
  width: 100%; /* Use 100% to maintain aspect ratio */
  object-fit: cover; /* Maintain aspect ratio and cover the container */
  transform: scale(1);
  transition: ease-in-out 0.5s;
  border-right: 1px solid #1dd1a1;
}
.big-card .image-section img:hover {
  transform: scale(1.2);
  transition: ease-in-out 0.5s;
}
.big-card .data-section {
  width: 500px;
  margin: 50px;
}
.big-card .data-section input {
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
  text-align: center;
}
.big-card .data-section button {
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
.big-card .data-section button:hover {
  border: none;
  background-color: #1dd1a1;
  color: white;
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
.big-card-two .user-review {
  background-color: #dddd;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 15px;
}
.big-card-two .user-review .user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.big-card-two .user-review .user-profile img {
  width: 50px;
  border: 1px solid #1dd1a1;
  border-radius: 50px;
  margin-right: 10px;
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
