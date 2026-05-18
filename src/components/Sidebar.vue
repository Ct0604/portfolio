<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-photo">
        <img v-if="data.personal.photo" :src="data.personal.photo" alt="陈涛" />
        <div v-else class="sidebar-photo-placeholder">CT</div>
      </div>
      <div>
        <div class="sidebar-name">{{ data.personal.name }}</div>
        <div class="sidebar-title">{{ data.personal.title }}</div>
      </div>
    </div>

    <ul class="sidebar-nav">
      <li><router-link to="/" exact-active-class="exact-active">首页</router-link></li>
      <li><span @click="goWorks">作品</span></li>
      <li><span @click="goAbout">关于我</span></li>
    </ul>

    <div class="sidebar-footer">
      <ul class="sidebar-contact">
        <li><a :href="'mailto:' + data.personal.email">邮箱</a></li>
        <li><a :href="'tel:' + data.personal.phone">电话</a></li>
        <li><a :href="data.personal.github" target="_blank" rel="noopener">GitHub</a></li>
      </ul>
      <div class="sidebar-copy">&copy; 2026 {{ data.personal.name }}</div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import data from '../data/portfolio.json'

const router = useRouter()
const route = useRoute()

function scrollOrGo(sectionId) {
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    })
  } else {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function goWorks() { scrollOrGo('works') }
function goAbout() { scrollOrGo('about') }
</script>
