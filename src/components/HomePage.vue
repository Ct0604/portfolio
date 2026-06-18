<template>
  <div>
    <!-- Hero -->
    <section id="hero" class="hero-section">
      <!-- HUD装饰 -->
      <div class="hero-hud-corners">
        <span class="hud-tl"></span>
        <span class="hud-tr"></span>
        <span class="hud-bl"></span>
        <span class="hud-br"></span>
      </div>
      
      <!-- 扫描线 -->
      <div class="hero-scanline"></div>
      
      <!-- 背景点阵 -->
      <div class="hero-grid"></div>
      
      <!-- 主内容 -->
      <div class="hero-content">
        <div class="hero-tag">[ PORTFOLIO.EXE ]</div>
        <h1 class="hero-name">陈涛</h1>
        <div class="hero-line"></div>
        <p class="hero-title">开发者 · 创意人 · 摄影师</p>
        <p class="hero-intro">代码与镜头之间，我找到了表达世界的方式</p>
      </div>
      
      <!-- 底部信息 -->
      <div class="hero-bottom">
        <span class="hero-bottom-info">v2.0.25</span>
        <span class="hero-bottom-info hero-status">STATUS: ONLINE</span>
      </div>
      
      <div class="hero-scroll">SCROLL</div>
    </section>

    <!-- Nav Dots -->
    <nav class="nav-dots">
      <button
        v-for="(s, i) in navSections"
        :key="s.id"
        class="nav-dot-wrap"
        :class="{ active: activeSection === i }"
        @click="scrollTo(s.id)"
      >
        <span class="nav-dot-label">{{ s.label }}</span>
        <span class="nav-dot"></span>
      </button>
    </nav>

    <!-- Works -->
    <div class="works-scroll">
      <!-- 布局1: 倾斜大屏 -->
      <section
        :id="'work-' + works[0].id"
        class="work-showcase layout-tilt-mega"
        :class="{ 'in-view': visibleSections.has('work-' + works[0].id) }"
        :style="{ '--accent': works[0].accent, '--glow': works[0].accent + '55' }"
        @click="goDetail(works[0].id)"
      >
        <div class="work-showcase-bg" :style="{ backgroundImage: `url(${works[0].cover})` }"></div>
        <div class="work-showcase-content">
          <span class="work-showcase-category">{{ works[0].category }}</span>
          <h2 class="work-showcase-title">{{ works[0].title }}</h2>
          <p class="work-showcase-desc">{{ works[0].description }}</p>
          <div class="work-showcase-tags">
            <span v-for="tag in works[0].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
          </div>
          <button class="work-showcase-enter">进入详情 →</button>
        </div>
        <span class="work-showcase-year">{{ works[0].year }}</span>
      </section>
      <section
        :id="'work-' + works[1].id"
        class="work-showcase layout-popup-glitch"
        :class="{ 'in-view': visibleSections.has('work-' + works[1].id) }"
        :style="{ '--accent': works[1].accent, '--bg': works[1].bg }"
        @click="goDetail(works[1].id)"
      >
        <div class="work-showcase-bg" :style="{ backgroundImage: `url(${works[1].cover})` }"></div>
        <div class="work-showcase-preview">
          <img :src="works[1].cover" :alt="works[1].title" />
        </div>
        <div class="work-showcase-card">
          <div class="work-showcase-card-body">
            <h3 class="work-showcase-card-title">{{ works[1].title }}</h3>
            <p class="work-showcase-card-desc">{{ works[1].description }}</p>
            <div class="work-showcase-card-tags">
              <span v-for="tag in works[1].tags" :key="tag" class="work-showcase-card-tag">{{ tag }}</span>
            </div>
            <button class="work-showcase-card-enter">进入详情 →</button>
          </div>
        </div>
      </section>

      <!-- 布局3+4: 开发组合 — 六边形 + 胶带斜贴 -->
      <div class="dev-duo">
        <!-- 布局3: 六边形 -->
        <section
          :id="'work-' + works[2].id"
          class="work-showcase layout-hexagon"
          :class="{ 'in-view': visibleSections.has('work-' + works[2].id) }"
          :style="{ '--accent': works[2].accent, '--bg': works[2].bg }"
          @click="goDetail(works[2].id)"
        >
          <div class="work-showcase-hex">
            <img :src="works[2].cover" :alt="works[2].title" />
          </div>
          <div class="work-showcase-info">
            <span class="work-showcase-category">{{ works[2].category }}</span>
            <h2 class="work-showcase-title">{{ works[2].title }}</h2>
            <p class="work-showcase-desc">{{ works[2].description }}</p>
            <div class="work-showcase-tags">
              <span v-for="tag in works[2].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
            </div>
          </div>
          <button class="work-showcase-enter">进入详情 →</button>
        </section>

        <!-- 布局4: 胶带斜贴 -->
        <section
          :id="'work-' + works[3].id"
          class="work-showcase layout-tape-slap"
          :class="{ 'in-view': visibleSections.has('work-' + works[3].id) }"
          :style="{ '--rot': works[3].rotation + 'deg', '--accent': works[3].accent }"
          @click="goDetail(works[3].id)"
        >
          <div class="work-showcase-tape">
            <img class="work-showcase-tape-img" :src="works[3].cover" :alt="works[3].title" />
          </div>
          <div class="work-showcase-label">
            <h2 class="work-showcase-title">{{ works[3].title }}</h2>
            <p class="work-showcase-desc">{{ works[3].description }}</p>
            <div class="work-showcase-tags">
              <span v-for="tag in works[3].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
            </div>
          </div>
          <button class="work-showcase-enter">进入详情 →</button>
        </section>
      </div>

      <!-- 布局5: 电影宽银幕 -->
      <section
        :id="'work-' + works[4].id"
        class="work-showcase layout-cinema-bar"
        :class="{ 'in-view': visibleSections.has('work-' + works[4].id) }"
        :style="{ '--accent': works[4].accent }"
        @click="goDetail(works[4].id)"
      >
        <div class="work-showcase-cinema">
          <img :src="works[4].cover" :alt="works[4].title" />
          <div class="work-showcase-progress">
            <div class="work-showcase-progress-fill"></div>
          </div>
          <div class="work-showcase-info">
            <span class="work-showcase-category">{{ works[4].category }}</span>
            <h2 class="work-showcase-title">{{ works[4].title }}</h2>
            <p class="work-showcase-desc">{{ works[4].description }}</p>
            <div class="work-showcase-tags">
              <span v-for="tag in works[4].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
            </div>
          </div>
          <span class="work-showcase-year">{{ works[4].year }}</span>
        </div>
      </section>

      <!-- 布局6+7: 摄影组合 — 角落迷你 + 扫描长条 -->
      <div class="photography-duo">
        <!-- 布局6: 左文右图 -->
        <section
          :id="'work-' + works[5].id"
          class="work-showcase layout-corner-mini"
          :class="{ 'in-view': visibleSections.has('work-' + works[5].id) }"
          :style="{ '--accent': works[5].accent }"
          @click="goDetail(works[5].id)"
        >
          <div class="work-showcase-left">
            <span class="work-showcase-left-category">{{ works[5].category }}</span>
            <h2 class="work-showcase-left-title">{{ works[5].title }}</h2>
            <p class="work-showcase-left-desc">{{ works[5].description }}</p>
            <div class="work-showcase-left-tags">
              <span v-for="tag in works[5].tags" :key="tag" class="work-showcase-left-tag">{{ tag }}</span>
            </div>
            <button class="work-showcase-left-enter">进入详情 →</button>
          </div>
          <div class="work-showcase-right">
            <div class="work-showcase-mini">
              <img class="work-showcase-mini-img" :src="works[5].cover" :alt="works[5].title" />
            </div>
          </div>
        </section>

        <!-- 布局7: 扫描长条 -->
        <section
          :id="'work-' + works[6].id"
          class="work-showcase layout-scan-strip"
          :class="{ 'in-view': visibleSections.has('work-' + works[6].id) }"
          :style="{ '--accent': works[6].accent, '--glow': works[6].accent + '55' }"
          @click="goDetail(works[6].id)"
        >
          <div class="work-showcase-strip">
            <img class="work-showcase-strip-img" :src="works[6].cover" :alt="works[6].title" />
            <div class="work-showcase-strip-overlay">
              <h2 class="work-showcase-title">{{ works[6].title }}</h2>
            </div>
            <div class="work-showcase-meta">
              <span class="work-showcase-category">{{ works[6].category }}</span>
              <p class="work-showcase-desc">{{ works[6].description }}</p>
              <div class="work-showcase-tags">
                <span v-for="tag in works[6].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <button class="work-showcase-enter">进入详情 →</button>
        </section>
      </div>

      <!-- 布局8: 全屏海报 -->
      <section
        :id="'work-' + works[7].id"
        class="work-showcase layout-poster-huge"
        :class="{ 'in-view': visibleSections.has('work-' + works[7].id) }"
        :style="{ '--accent': works[7].accent, '--glow': works[7].accent + '55' }"
        @click="goDetail(works[7].id)"
      >
        <div class="work-showcase-bg" :style="{ backgroundImage: `url(${works[7].cover})` }"></div>
        <div class="work-showcase-content">
          <span class="work-showcase-category">{{ works[7].category }}</span>
          <h2 class="work-showcase-title">{{ works[7].title }}</h2>
          <p class="work-showcase-desc">{{ works[7].description }}</p>
          <div class="work-showcase-tags">
            <span v-for="tag in works[7].tags" :key="tag" class="work-showcase-tag">{{ tag }}</span>
          </div>
          <button class="work-showcase-enter">进入详情 →</button>
        </div>
        <span class="work-showcase-year">{{ works[7].year }}</span>
      </section>
    </div>

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

    <!-- Contact -->
    <section class="section contact-section">
      <div class="section-header" style="text-align: center;">
        <h2>联系方式</h2>
      </div>
      <div class="contact-links">
        <a :href="'mailto:' + data.personal.email" class="contact-link">✉ 邮箱</a>
        <a :href="'tel:' + data.personal.phone" class="contact-link">☎ 电话</a>
        <a :href="data.personal.github" target="_blank" rel="noopener" class="contact-link">⟁ GitHub</a>
      </div>
      <div class="contact-copyright">&copy; 2026 {{ data.personal.name }}</div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import data from '../data/portfolio.json'

const router = useRouter()
const works = data.works

const navSections = [
  { id: 'hero', label: '首页' },
  ...works.map(w => ({ id: 'work-' + w.id, label: w.title })),
  { id: 'about', label: '关于我' }
]

const activeSection = ref(0)
const visibleSections = reactive(new Set())

function goDetail(id) {
  router.push(`/work/${id}`)
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

let observer = null

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting) {
          visibleSections.add(id)
          const idx = navSections.findIndex(s => s.id === id)
          if (idx !== -1) activeSection.value = idx
        } else {
          visibleSections.delete(id)
        }
      })
    },
    { threshold: 0.2 }
  )

  navSections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  nextTick(setupObserver)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
