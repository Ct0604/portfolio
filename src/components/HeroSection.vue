<template>
  <section class="hero">
    <div class="hero-photo">
      <img v-if="photo" :src="photo" alt="陈涛" />
      <div v-else class="hero-photo-placeholder">你的照片</div>
    </div>
    <div class="hero-text">
      <h1>{{ name }}</h1>
      <p class="subtitle">{{ title }}</p>
      <p class="intro">{{ intro }}</p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: String,
  title: String,
  intro: String,
  photo: String
})
</script>
