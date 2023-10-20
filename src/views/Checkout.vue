<script setup>
import { ref, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const totalCartPrice = Number(route.query.totalCartPrice);

// Props received from the route
const props = defineProps({
  id: Number,
  quantity: Number,
  price: Number,
});

const cart = ref([]);

// Populate the cart data from the query parameter on page load
if (route.query.cart) {
  cart.value = JSON.parse(route.query.cart);
}

// Define a computed property to parse the cart data from the query parameter
const cartData = computed(() => {
  if (route.query.cart) {
    return JSON.parse(route.query.cart);
  }
  return [];
});

const removeItem = (itemId) => {
  // Find the index of the item to remove
  const indexToRemove = cart.value.findIndex((item) => item.id === itemId);

  if (indexToRemove !== -1) {
    // Remove the item from the cart
    cart.value.splice(indexToRemove, 1);

    localStorage.setItem("cart", JSON.stringify(cart.value));

    // Update the query parameter in the URL with the updated cart data
    router.push({
      name: "Checkout",
      query: {
        cart: JSON.stringify(cart.value),
      },
    });
  }
};
</script>

<template>
  <!-- <div>
    <h1>Checkout</h1>
    <p>Product ID: {{ $route.params.id }}</p>
    <p>Quantity: {{ $route.params.quantity }}</p>
    <p>Price: {{ $route.params.price }}</p>
  </div> -->

  <div class="container">
    <div class="big-card">
      <!-- <div>
    <h1>Checkout</h1>
    <p>Product ID: {{ props.id }}</p>
    <p>Quantity: {{ props.quantity }}</p>
    <p>Price: {{ props.price }}</p>
  </div> -->
      <h1 v-show="cartData.length === 0">No Data</h1>
      <ul>
        <li v-for="item in cartData" :key="item.id" class="content">
          <div class="img-section">
            <img :src="item.image" />
          </div>
          <div class="data-section">
            <p>{{ item.name }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: {{ item.price }}</p>
            <button @click="removeItem(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="pricing" v-if="cart.length > 0">
        <h3>Total Price: {{ totalCartPrice }}</h3>
      </div>
      <button>Pay</button>
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
  flex-direction: column;
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
  padding: 15px;
}
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
.big-card .pricing {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.big-card button {
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
.big-card button:hover {
  border: none;
  background-color: #1dd1a1;
  color: white;
}
hr {
  border: 1px solid #1dd1a1;
}
</style>
