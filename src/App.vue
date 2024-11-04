<script setup>
import { ref, computed } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter();

const cartNotif = ref(false);

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const showCartNotif = () => {
  cartNotif.value = !cartNotif.value;
};

const calculateCartLength = computed(() => {
  return cart.value ? cart.value.length : 0;
});

const removeItem = (itemId) => {
  const indexToRemove = cart.value.findIndex((item) => item.id === itemId);

  if (indexToRemove !== -1) {
    cart.value.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }
};

const totalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});
</script>

<template>
  <header>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin&family=Poppins&display=swap" rel="stylesheet" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <p>Home</p>
        </RouterLink>
        <img @click="showCartNotif"
          src="https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
          alt="" />
        <div class="cart-notif" v-if="cartNotif">
          <div class="data-notif" v-if="cart.length === 0">
            <h3>No Data</h3>
          </div>
          <div class="item-section" v-for="(item, index) in cart" :key="index">
            <p>{{ item.name }}</p>
            <p class="remove-icon" @click="removeItem(item.id)">X</p>
          </div>
          <RouterLink :to="{
            name: 'Checkout',
            query: {
              cart: JSON.stringify(cart),
              totalCartPrice: totalCartPrice,
            },
          }">
            <button v-if="cart.length > 0">Checkout</button>
          </RouterLink>
        </div>
        <div class="total-items">
          <p>{{ calculateCartLength }}</p>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Poppins", sans-serif;
  background-color: #dddd;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid #1dd1a1;
  height: 60px;
  box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 0px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 40px;
}

nav a {
  text-decoration: none;
  color: black;
}

img {
  height: 40%;
  cursor: pointer;
}

.cart-notif {
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: white;
  border: 1px solid #1dd1a1;
  position: absolute;
  top: 70px;
  right: 27px;
  z-index: 1;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: scroll;
  transition: ease-in-out;
  animation-name: cart-notif;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.cart-notif p {
  border-radius: 15px;
  margin-bottom: 5px;
}

.data-notif {
  display: flex;
  justify-content: center;
}

.item-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 15px;
  padding: 3px;
  transition: ease-in-out;
  animation-name: item-notif;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.item-section .remove-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1dd1a1;
  color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.cart-notif button {
  background-color: white;
  border: 1px solid #1dd1a1;
  border-radius: 15px;
  width: 100%;
  padding: 7px;
  cursor: pointer;
  animation-name: item-notif;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

.cart-notif button:hover {
  background-color: #1dd1a1;
  color: white;
  transition: ease-in-out 0.3s;
}

.total-items {
  position: absolute;
  top: 25px;
  right: 280px;
  z-index: 1;
  background-color: red;
  color: white;
  border-radius: 15px;
  padding: 3px;
  width: 30px;
  text-align: center;
}

@keyframes cart-notif {
  0% {
    height: 50px;
  }

  100% {
    height: 300px;
  }
}

@keyframes item-notif {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 768px) {
  .total-items {
    right: 153px;
  }
}

@media screen and (max-width: 764px) {
  .total-items {
    right: 83px;
  }
}
</style>
