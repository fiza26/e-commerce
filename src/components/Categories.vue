<script setup>

</script>

<template>
  <div class="categories">
    <span @click="$emit('showAll')">All</span>
    <span @click="$emit('filterByBrand', 'adidas')">Adidas</span>
    <span @click="$emit('filterByBrand', 'nike')">Nike</span>
    <span @click="$emit('filterByBrand', 'puma')">Puma</span>
  </div>
</template>

<style scoped>
.categories {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.categories span {
  border: 1px solid #1dd1a1;
  margin: 5px;
  padding: 3px;
  border-radius: 15px;
  width: 100px;
  text-align: center;
  cursor: pointer;
}

.categories span:hover {
  border: none;
  background-color: #1dd1a1;
  color: white;
}
</style>