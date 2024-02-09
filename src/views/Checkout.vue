<script setup>
import { ref, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import NoCartData from "../components/NoCartData.vue";
import ContentSection from "../components/ContentSection.vue";
import Pricing from "../components/Pricing.vue";
import SetAddressBtn from "../components/SetAddressBtn.vue";
import NoAddressData from "../components/NoAddressData.vue";
import ShowAddress from "../components/ShowAddress.vue";
import ChooseAddress from "../components/ChooseAddress.vue";
import SelectedAddress from "../components/SelectedAddress.vue";
import UseSavedAddressBtn from "../components/UseSavedAddressBtn.vue";
import SaveAddressBtn from "../components/SaveAddressBtn.vue";
import ChoosePaymentOption from "../components/ChoosePaymentOption.vue";
import PaymentOptions from "../components/PaymentOptions.vue";
import PayNow from "../components/PayNow.vue";
import BackAndPayBtn from "../components/BackAndPayBtn.vue";

const route = useRoute();
const router = useRouter();

const totalCartPrice = Number(route.query.totalCartPrice);

const computedTotalCartPrice = computed(() => {
  return cart.value.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

const props = defineProps({
  id: Number,
  quantity: Number,
  price: Number,
});

const cart = computed(() => {
  return JSON.parse(localStorage.getItem("cart") || []);
});

if (route.query.cart) {
  cart.value = JSON.parse(route.query.cart);
}

const cartData = computed(() => {
  if (route.query.cart) {
    return JSON.parse(route.query.cart);
  }
  return [];
});

const removeItem = (itemId) => {
  const indexToRemove = cart.value.findIndex((item) => item.id === itemId);

  if (indexToRemove !== -1) {
    cart.value.splice(indexToRemove, 1);

    localStorage.setItem("cart", JSON.stringify(cart.value));

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

const selectedAddress = ref(null);
const chooseAddressState = ref(false);

const chooseAddress = (address) => {
  selectedAddress.value = address;
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

const payState = ref(false);

const pay = () => {
  console.log("clicked");
  payState.value = true;
};

const processPaymentState = ref(false);
const indomaretState = ref(false);
const alfamartState = ref(false);
const briState = ref(false);
const bcaState = ref(false);
const bsiState = ref(false);

const processPayment = (paymentOption) => {
  console.log(alfamartState);

  processPaymentState.value = true;

  indomaretState.value = false;
  alfamartState.value = false;
  briState.value = false;
  bcaState.value = false;
  bsiState.value = false;

  switch (paymentOption) {
    case "indomaret":
      indomaretState.value = true;
      break;
    case "alfamart":
      alfamartState.value = true;
      break;
    case "bri":
      briState.value = true;
      break;
    case "bca":
      bcaState.value = true;
      break;
    case "bsi":
      bsiState.value = true;
      break;
    default:
      break;
  }
};
</script>

<template>
  <div class="container">
    <div class="big-card">
      <NoCartData :cartData="cartData" />
      <ContentSection :payState="payState" :cart="cart" @removeItem="removeItem" />
      <Pricing :cart="cart" :payState="payState" :computedTotalCartPrice="computedTotalCartPrice" />
      <SetAddressBtn @setAddress="setAddress" :saveAddressState="saveAddressState" :addressState="addressState"
        :useAddressState="useAddressState" />
      <NoAddressData :useAddressState="useAddressState" :addressData="addressData" />
      <ShowAddress :saveAddressState="saveAddressState" :name="name" :address1="address1" :address2="address2"
        :postalCode="postalCode" :phoneNumber="phoneNumber" />
      <ChooseAddress :useAddressState="useAddressState" :chooseAddressState="chooseAddressState"
        :addressData="addressData" @chooseAddress="chooseAddress" @deleteAddress="deleteAddress" />
      <SelectedAddress :chooseAddressState="chooseAddressState" :payState="payState" :selectedAddress="selectedAddress" />
      <div class="input-address" v-if="addressState && saveAddressState === false">
        <input v-model="name" type="text" placeholder="Name" />
        <input v-model="address1" type="text" placeholder="Address 1" />
        <input v-model="address2" type="text" placeholder="Address 2" />
        <input v-model="postalCode" type="number" placeholder="Postal Code" />
        <input v-model="phoneNumber" type="number" placeholder="Phone Number" />
        <UseSavedAddressBtn @useAddress="useAddress" />
      </div>
      <SaveAddressBtn @saveAddress="saveAddress" :addressState="addressState" :saveAddressState="saveAddressState" />
      <ChoosePaymentOption :payState="payState" :processPaymentState="processPaymentState" />
      <PaymentOptions :payState="payState" :processPaymentState="processPaymentState" @processPayment="processPayment" />
      <PayNow :indomaretState="indomaretState" :alfamartState="alfamartState" :briState="briState" :bcaState="bcaState"
        :bsiState="bsiState" :computedTotalCartPrice="computedTotalCartPrice"
        :processPaymentState="processpaymentState" />
      <BackAndPayBtn :payState="payState" :useAddressState="useAddressState" :saveAddressState="saveAddressState"
        @backNewAddress="backNewAddress" :chooseAddressState="chooseAddressState" :addressData="addressData" @pay="pay" />
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
