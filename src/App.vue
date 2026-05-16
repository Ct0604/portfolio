<template>
  <NavBar />
  <HeroSection
    :name="data.personal.name"
    :title="data.personal.title"
    :intro="data.personal.intro"
    :photo="data.personal.photo"
  />
  <WorkGrid
    :works="data.works"
    @select="selectedWork = $event"
  />
  <AboutSection
    :about="data.personal.about"
    :skills="data.personal.skills"
  />
  <FooterBar
    :name="data.personal.name"
    :email="data.personal.email"
    :phone="data.personal.phone"
    :github="data.personal.github"
    :year="2026"
  />
  <Lightbox
    :work="selectedWork"
    @close="selectedWork = null"
  />
</template>

<script setup>
import { ref } from 'vue'
import data from './data/portfolio.json'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import WorkGrid from './components/WorkGrid.vue'
import AboutSection from './components/AboutSection.vue'
import FooterBar from './components/FooterBar.vue'
import Lightbox from './components/Lightbox.vue'

const selectedWork = ref(null)
</script>
