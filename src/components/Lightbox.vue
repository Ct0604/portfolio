<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="work" class="lightbox-overlay" @click.self="close">
        <button class="lightbox-close" @click="close">&times;</button>
        <div class="lightbox-content" @click.stop>
          <div class="lightbox-image">
            <img v-if="work.cover && work.cover !== ''" :src="work.cover" :alt="work.title" />
            <div v-else class="lightbox-image-placeholder">{{ work.category }}</div>
          </div>
          <div class="lightbox-meta">
            <span class="lightbox-category">{{ work.category }}</span>
            <span class="lightbox-year">{{ work.year }}</span>
          </div>
          <h2 class="lightbox-title">{{ work.title }}</h2>
          <p class="lightbox-description">{{ work.description }}</p>
          <div class="lightbox-tags">
            <span v-for="tag in work.tags" :key="tag">{{ tag }}</span>
          </div>
          <a
            v-if="work.link && work.link !== ''"
            :href="work.link"
            target="_blank"
            rel="noopener"
            class="lightbox-link"
          >查看项目 &rarr;</a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({
  work: Object
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function onKeyDown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))
</script>
