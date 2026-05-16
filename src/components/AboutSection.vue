<template>
  <section id="about" class="section">
    <p class="section-label">关于</p>
    <div class="about-content">
      <p v-for="(para, i) in about" :key="i">{{ para }}</p>
      <div class="skills-cloud">
        <span v-for="skill in skills" :key="skill" class="skill-tag">{{ skill }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  about: Array,
  skills: Array
})
</script>
