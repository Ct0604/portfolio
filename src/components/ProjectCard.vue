<template>
  <div class="project-card" :class="{ large: work.large }" @click="$emit('click')">
    <div class="project-card-cover">
      <img v-if="work.cover" :src="work.cover" :alt="work.title" />
      <div v-else class="project-card-cover-placeholder">{{ work.category }}</div>
    </div>
    <div class="project-card-body">
      <div class="project-card-meta">
        <span class="project-card-category">{{ work.category }}</span>
        <span class="project-card-year">{{ work.year }}</span>
      </div>
      <h3>{{ work.title }}</h3>
      <p class="project-card-desc">{{ work.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  work: Object
})

defineEmits(['click'])
</script>
