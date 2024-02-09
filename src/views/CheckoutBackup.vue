<script setup>
import { ref, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const totalCartPrice = Number(route.query.totalCartPrice);

const computedTotalCartPrice = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

// Props received from the route
const props = defineProps({
  id: Number,
  quantity: Number,
  price: Number,
});

// const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const cart = computed(() => {
  return JSON.parse(localStorage.getItem("cart") || []);
});

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
  setTimeout(() => {
    window.location.reload();
  }, 100);
};

const addressState = ref(false);
const setAddress = () => {
  addressState.value = !addressState.value;
};

const addressData = ref(JSON.parse(localStorage.getItem("address")) || []);

const name = ref();
const address1 = ref();
const address2 = ref();
const postalCode = ref();
const phoneNumber = ref();

const selectedAddress = ref(null); // Add a reference to track the selected address
const chooseAddressState = ref(false);

const chooseAddress = (address) => {
  selectedAddress.value = address; // Set the selected address
  chooseAddressState.value = true;
  console.log("Selected address: ", selectedAddress.value);
};

const deleteAddress = (address) => {
  const indexToRemove = addressData.value.findIndex(
    (item) => item.name === address.name
  );

  if (indexToRemove !== -1) {
    addressData.value.splice(indexToRemove, 1);
    localStorage.setItem("address", JSON.stringify(addressData.value));
  }
};

const useAddressState = ref(false);

const useAddress = () => {
  addressState.value = false;
  useAddressState.value = true;
};

const saveAddressState = ref(false);

const saveAddress = () => {
  if (
    !name.value ||
    !address1.value ||
    !postalCode.value ||
    !phoneNumber.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const address = {
    name: name.value,
    address1: address1.value,
    address2: address2.value,
    postalCode: postalCode.value,
    phoneNumber: phoneNumber.value,
  };
  addressData.value.push(address);
  localStorage.setItem("address", JSON.stringify(addressData.value));
  saveAddressState.value = true;
  console.log("Saved");
};

const backNewAddress = () => {
  useAddressState.value = false;
  addressState.value = true;
  chooseAddressState.value = false;
  saveAddressState.value = false;
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
        <li v-for="item in cart" :key="item.id" class="content">
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
        <h3>Total Price: {{ computedTotalCartPrice }}</h3>
      </div>
      <button
        @click="setAddress"
        v-if="!saveAddressState && !addressState && !useAddressState"
      >
        Set Address
      </button>
      <h1 v-if="useAddressState && addressData.length === 0">No data</h1>
      <div class="input-address" v-if="saveAddressState">
        <p>Name : {{ name }}</p>
        <hr />
        <p>Address 1 : {{ address1 }}</p>
        <hr />
        <p>Address 2 : {{ address2 }}</p>
        <hr />
        <p>Postal Code : {{ postalCode }}</p>
        <hr />
        <p>Phone Number : {{ phoneNumber }}</p>
        <hr />
      </div>
      <div
        class="input-address"
        v-if="useAddressState && chooseAddressState === false"
        v-for="alamat in addressData"
        :key="index"
      >
        <p>Name : {{ alamat.name }}</p>
        <hr />
        <p>Address 1 : {{ alamat.address1 }}</p>
        <hr />
        <p>Address 2 : {{ alamat.address2 }}</p>
        <hr />
        <p>Postal Code : {{ alamat.postalCode }}</p>
        <hr />
        <p>Phone Number : {{ alamat.phoneNumber }}</p>
        <hr />
        <button class="saved-address" @click="chooseAddress(alamat)">
          Choose Address
        </button>
        <button class="saved-address" @click="deleteAddress(alamat)">
          Delete Address
        </button>
      </div>
      <div class="input-address" v-if="chooseAddressState">
        <p>Name : {{ selectedAddress.name }}</p>
        <hr />
        <p>Address 1 : {{ selectedAddress.address1 }}</p>
        <hr />
        <p>Address 2 : {{ selectedAddress.address2 }}</p>
        <hr />
        <p>Postal Code : {{ selectedAddress.postalCode }}</p>
        <hr />
        <p>Phone Number : {{ selectedAddress.phoneNumber }}</p>
        <hr />
      </div>
      <div
        class="input-address"
        v-if="addressState && saveAddressState === false"
      >
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="address1" type="text" placeholder="Address 1" />
        <input v-model="address2" type="text" placeholder="Address 2" />
        <input v-model="postalCode" type="number" placeholder="Postal Code" />
        <input v-model="phoneNumber" type="number" placeholder="Phone Number" />
        <button @click="useAddress" class="saved-address">
          Use Saved Address
        </button>
      </div>
      <button
        @click="saveAddress"
        v-if="addressState && saveAddressState === false"
      >
        Save Address
      </button>
      <button
        v-if="useAddressState || saveAddressState"
        @click="backNewAddress"
      >
        Back
      </button>
      <button
        v-if="saveAddressState || useAddressState"
        :disabled="addressData.length < 1"
      >
        Pay
      </button>
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
.big-card .input-address {
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  background-color: #dddd;
  padding: 7px;
  border-radius: 15px;
}
.big-card .input-address input {
  font-family: "Poppins", sans-serif;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 15px;
  border: none;
  padding: 7px;
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
.big-card .saved-address {
  background-color: #1dd1a1;
  color: white;
}
</style>
