<template>
    <header class="header">
      <h1>{{ title }}</h1>
    </header>
  </template>
  
<script setup>
defineProps({
  name: "MenuSuperior",
  title: {
    type: String,
    default: "Sistema de Recrutamento",
  }
});
</script>

<style scoped>
.header {
  background-color: rgb(255, 255, 255);
  color: rgb(20, 19, 19);
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
  box-shadow: 0px 1px 8px 3px #d9dae1; 
}
</style>
  