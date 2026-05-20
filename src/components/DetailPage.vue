<template>
  <div class="detail-page">
    <button class="detail-back" @click="goBack">← 返回</button>
    <div class="detail-hero">
      <!-- 左栏：主图 / 视频 + 缩略图条 -->
      <div class="detail-media">
        <!-- 视频播放器 -->
        <div v-if="showVideo" class="detail-video-wrap" ref="videoWrap">
          <video
            v-if="isLocalVideo"
            ref="videoPlayer"
            :src="work.video"
            controls
            class="detail-video"
          ></video>
          <iframe
            v-else
            :src="work.video"
            class="detail-video"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <!-- 图片 -->
        <div v-else class="detail-image" ref="imageWrap" @click="openViewer">
          <img
            v-if="currentImage"
            :src="currentImage"
            :alt="work.title"
            :key="currentIndex"
            ref="mainImage"
          />
          <div v-else class="detail-image-placeholder">{{ work.category }}</div>
        </div>

        <!-- 缩略图条 -->
        <div v-if="thumbnails.length > 1 || hasVideo" class="detail-thumbs" ref="thumbsBar">
          <!-- 视频缩略图 -->
          <button
            v-if="hasVideo"
            class="detail-thumb"
            :class="{ active: showVideo }"
            @click="switchToVideo"
          >
            <span class="thumb-icon">▶</span>
          </button>
          <!-- 图片缩略图 -->
          <button
            v-for="(img, i) in thumbnails"
            :key="i"
            class="detail-thumb"
            :class="{ active: !showVideo && currentIndex === i }"
            @click="switchTo(i)"
          >
            <img :src="img" :alt="`${work.title} ${i + 1}`" />
          </button>
        </div>
      </div>

      <!-- 右栏：信息 -->
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

    <ImageViewer ref="viewerRef" :images="thumbnails" :index="currentIndex" :alt="work.title" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { animate } from 'animejs'
import ImageViewer from './ImageViewer.vue'
import data from '../data/portfolio.json'

const props = defineProps({ id: String })
const router = useRouter()

const work = computed(() => data.works.find(w => w.id === Number(props.id)) || data.works[0])

const currentIndex = ref(0)
const showVideo = ref(false)
const imageWrap = ref(null)
const videoWrap = ref(null)
const viewerRef = ref(null)

const thumbnails = computed(() => {
  const imgs = work.value.images || []
  return imgs.length > 0 ? imgs : [work.value.cover]
})

const hasVideo = computed(() => !!(work.value.video && work.value.video.length > 0))
const isLocalVideo = computed(() => {
  if (!hasVideo.value) return false
  const v = work.value.video
  return !v.startsWith('http') && !v.startsWith('//')
})

const currentImage = computed(() => thumbnails.value[currentIndex.value] || null)

function openViewer() {
  if (showVideo.value) return
  viewerRef.value?.open()
}

function goBack() {
  router.push('/')
}

// ── 切换到图片 ──
function switchTo(index) {
  if (index === currentIndex.value && !showVideo.value) return
  const wasVideo = showVideo.value
  showVideo.value = false

  nextTick(() => {
    if (wasVideo) {
      // 从视频切到图片：弹入
      animate(imageWrap.value, {
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 350,
        ease: 'outExpo'
      })
    } else if (currentIndex.value !== index) {
      // 图片之间切换：侧滑
      const dir = index > currentIndex.value ? 20 : -20
      animate(imageWrap.value, {
        x: [dir, 0],
        opacity: [0, 1],
        duration: 300,
        ease: 'outExpo'
      })
    }
    currentIndex.value = index
  })
}

// ── 切换到视频 ──
function switchToVideo() {
  if (showVideo.value) return
  showVideo.value = true
  nextTick(() => {
    animate(videoWrap.value, {
      opacity: [0, 1],
      scale: [0.94, 1],
      duration: 400,
      ease: 'outExpo'
    })
  })
}

// ── 键盘左右切换 ──
function onKeyDown(e) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (hasVideo.value && showVideo.value) {
      switchTo(thumbnails.value.length - 1)
    } else if (currentIndex.value > 0) {
      switchTo(currentIndex.value - 1)
    }
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    if (!showVideo.value && currentIndex.value < thumbnails.value.length - 1) {
      switchTo(currentIndex.value + 1)
    } else if (!showVideo.value && hasVideo.value) {
      switchToVideo()
    }
  }
}

onMounted(() => {
  // 有视频时默认显示视频
  if (hasVideo.value) {
    showVideo.value = true
    nextTick(() => {
      if (videoWrap.value) {
        animate(videoWrap.value, {
          opacity: [0, 1],
          scale: [0.94, 1],
          duration: 400,
          ease: 'outExpo'
        })
      }
    })
  }
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>
