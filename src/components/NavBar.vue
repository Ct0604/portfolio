<template>
  <nav class="navbar" :class="{ scrolled }">
    <span class="navbar-name" @click="scrollToTop">陈涛</span>
    <ul class="navbar-links">
      <li><a href="#works" @click.prevent="scrollTo('works')">作品</a></li>
      <li><a href="#about" @click.prevent="scrollTo('about')">关于</a></li>
      <li><a href="#contact" @click.prevent="scrollTo('contact')">联系</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
