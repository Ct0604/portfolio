<template>
  <div class="detail-page">
    <button class="detail-back" @click="goBack">← 返回</button>
    <div class="detail-hero">
      <div class="detail-image">
        <img v-if="work.cover" :src="work.cover" :alt="work.title" />
        <div v-else class="detail-image-placeholder">{{ work.category }}</div>
      </div>
      <div class="detail-info">
        <div class="detail-meta">
          <span class="detail-category">{{ work.category }}</span>
          <span class="detail-year">{{ work.year }}</span>
        </div>
        <h1 class="detail-title">{{ work.title }}</h1>
        <div class="detail-divider"></div>
        <p class="detail-description">{{ work.description }}</p>
        <div class="detail-tags">
          <span v-for="tag in work.tags" :key="tag">{{ tag }}</span>
        </div>
        <a
          v-if="work.link"
          :href="work.link"
          target="_blank"
          rel="noopener"
          class="detail-link"
        >查看项目 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import data from '../data/portfolio.json'

const props = defineProps({
  id: String
})

const router = useRouter()

const work = computed(() => {
  return data.works.find(w => w.id === Number(props.id)) || data.works[0]
})

function goBack() {
  router.push('/')
}
</script>
