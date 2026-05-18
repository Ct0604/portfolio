<template>
  <section id="works" class="section">
    <p class="section-label">作品</p>
    <div class="filter-bar">
      <button
        class="filter-btn"
        :class="{ active: activeFilter === '全部' }"
        @click="activeFilter = '全部'"
      >全部</button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ active: activeFilter === cat }"
        @click="activeFilter = cat"
      >{{ cat }}</button>
    </div>
    <TransitionGroup name="list" tag="div" class="work-grid">
      <ProjectCard
        v-for="work in filteredWorks"
        :key="work.id"
        :work="work"
        :data-index="filteredWorks.indexOf(work)"
        @select="$emit('select', $event)"
      />
    </TransitionGroup>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  works: Array
})

defineEmits(['select'])

const activeFilter = ref('全部')

const categories = computed(() => {
  return [...new Set(props.works.map(w => w.category))]
})

const filteredWorks = computed(() => {
  if (activeFilter.value === '全部') return props.works
  return props.works.filter(w => w.category === activeFilter.value)
})
</script>
