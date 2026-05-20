<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="image-viewer" @click.self="close">
        <button class="iv-close" @click="close">&times;</button>

        <div class="iv-main" ref="mainRef">
          <img :src="images[currentIndex]" :key="currentIndex" :alt="alt" />
        </div>

        <button v-if="images.length > 1" class="iv-arrow iv-prev" @click.stop="prev">&lsaquo;</button>
        <button v-if="images.length > 1" class="iv-arrow iv-next" @click.stop="next">&rsaquo;</button>

        <div v-if="images.length > 1" class="iv-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { animate } from 'animejs'

const props = defineProps({
  images: Array,
  index: Number,
  alt: String
})

const emit = defineEmits(['close'])

const visible = ref(false)
const currentIndex = ref(0)
const mainRef = ref(null)

function open() {
  currentIndex.value = props.index || 0
  visible.value = true
  nextTick(() => {
    if (mainRef.value) {
      animate(mainRef.value, {
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 350,
        ease: 'outExpo'
      })
    }
  })
}

function close() {
  const el = mainRef.value
  if (el) {
    animate(el, {
      scale: [1, 0.94],
      opacity: [1, 0],
      duration: 200,
      ease: 'inExpo',
      onComplete: () => { visible.value = false }
    })
  } else {
    visible.value = false
  }
}

function prev() { if (currentIndex.value > 0) switchTo(currentIndex.value - 1, 'left') }
function next() { if (currentIndex.value < props.images.length - 1) switchTo(currentIndex.value + 1, 'right') }

function switchTo(index, dir) {
  const el = mainRef.value
  if (!el) { currentIndex.value = index; return }
  const x = dir === 'left' ? 30 : -30
  animate(el, {
    x: [x, 0],
    opacity: [0.3, 1],
    duration: 280,
    ease: 'outExpo'
  })
  currentIndex.value = index
}

function onKeyDown(e) {
  if (!visible.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})

defineExpose({ open })
</script>
