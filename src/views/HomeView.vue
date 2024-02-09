<script setup>
import { ref } from "vue";
import data from "./data.json";

import Categories from "../components/Categories.vue";
import Container from "../components/Container.vue";

const items = ref(data);
const filteredItems = ref(items.value);

const showAll = () => {
  filteredItems.value = items.value;
};

const filterByBrand = (brand) => {
  filteredItems.value = items.value.filter((item) => item.brand === brand);
};
</script>

<template>
  <main>
    <Categories @showAll="showAll" @filterByBrand="filterByBrand" />
    <Container :filteredItems="filteredItems" />
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
