<template>
  <div>
    <div class="scroll-progress" ref="progressRef"></div>

    <!-- Works -->
    <section id="works" class="section">
      <div class="section-header">
        <h2>作品</h2>
      </div>
      <TransitionGroup name="list" tag="div" class="work-grid">
        <ProjectCard
          v-for="work in data.works"
          :key="work.id"
          :work="work"
          @click="goDetail(work.id)"
        />
      </TransitionGroup>
    </section>

    <!-- About -->
    <section id="about" class="section">
      <div class="section-header">
        <h2>关于我</h2>
      </div>
      <div class="about-content">
        <p v-for="(para, i) in data.personal.about" :key="i">{{ para }}</p>
        <ul class="skills-list">
          <li v-for="skill in data.personal.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { animate, stagger } from 'animejs'
import data from '../data/portfolio.json'
import ProjectCard from './ProjectCard.vue'

const router = useRouter()
const progressRef = ref(null)

function goDetail(id) {
  router.push(`/work/${id}`)
}

// ── 滚动进度条 ──
function updateProgress() {
  if (!progressRef.value) return
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const p = docHeight > 0 ? window.scrollY / docHeight : 0
  progressRef.value.style.transform = `scaleX(${p})`
}

function animateProgressOnLoad() {
  if (!progressRef.value) return
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const current = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0
  progressRef.value.style.transition = 'transform 500ms ease-out'
  progressRef.value.style.transform = `scaleX(${current})`
  setTimeout(() => {
    if (progressRef.value) progressRef.value.style.transition = 'none'
  }, 550)
}

// ── 卡片滚动渐显 ──
function setupCardReveal() {
  const wrapper = document.querySelector('.work-grid')
  if (!wrapper) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.project-card')
          if (cards.length > 0) {
            animate(cards, {
              y: [24, 0],
              opacity: [0, 1],
              delay: stagger(80),
              duration: 500,
              ease: 'outExpo'
            })
          }
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  )

  observer.observe(wrapper)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  nextTick(() => {
    animateProgressOnLoad()
    setTimeout(() => setupCardReveal(), 300)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>
