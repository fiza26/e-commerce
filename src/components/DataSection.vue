<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["product", "cartNotif", "quantity"]);
const emits = defineEmits(['tutup', 'updateQuantity']);

const updateQuantity = (event) => {
  emits.updateQuantity(event.target.value);
};

</script>

<template>
  <div class="data-section">
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>{{ product.price }}</p>
    <div class="item-added" v-if="cartNotif === true">
      <p>{{ quantity }} Item added to the cart</p>
      <p @click="$emit('tutup')" class="close-notif">X</p>
    </div>
    <input type="number" :value="quantity" @input="updateQuantity" placeholder="Quantity" />
    <button @click="$emit('addToCart')">Add to Cart</button>
    <RouterLink :to="{
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
    }">
      <button>Checkout</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.big-card .data-section {
  width: 500px;
  margin: 50px;
}

.big-card .data-section .item-added {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 450px;
  right: 50px;
  background-color: #1dd1a1;
  color: white;
  padding: 15px;
  border-radius: 15px;
  width: 300px;
  height: 100px;
  text-align: center;
  transition: ease-in-out;
  animation-name: item-notif;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.75);
}

.big-card .data-section .item-added .close-notif {
  background-color: white;
  padding: 3px;
  width: 30px;
  border-radius: 15px;
  color: black;
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

@keyframes item-notif {
  0% {
    transform: scale(0);
    transform: translate(20rem, 1rem);
  }

  100% {
    transform: scale(1);
    transform: translate(-1rem, 1rem);
  }
}

@media (max-width: 768px) {
  .big-card .data-section .item-added {
    right: 1%;
    width: 90%;
  }
}
</style>