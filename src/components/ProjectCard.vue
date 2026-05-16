<template>
  <div class="project-card" @click="$emit('select', work)">
    <div class="project-card-cover">
      <img v-if="work.cover && work.cover !== ''" :src="work.cover" :alt="work.title" />
      <div v-else class="project-card-cover-placeholder">{{ work.category }}</div>
    </div>
    <div class="project-card-meta">
      <span class="project-card-category">{{ work.category }}</span>
      <span class="project-card-year">{{ work.year }}</span>
    </div>
    <h3>{{ work.title }}</h3>
    <p class="project-card-desc">{{ work.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  work: Object
})

defineEmits(['select'])
</script>
