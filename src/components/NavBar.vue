<template>
  <nav class="navbar" :class="{ scrolled }">
    <router-link class="navbar-name" to="/">陈涛</router-link>
    <ul class="navbar-links">
      <li><router-link to="/" exact-active-class="active">首页</router-link></li>
      <li><span @click="goWorks">作品</span></li>
      <li><span @click="goAbout">关于我</span></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function goWorks() {
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  } else {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }
}

function goAbout() {
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  } else {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
