<template>
  <footer id="contact" class="footer">
    <div class="footer-inner">
      <ul class="footer-links">
        <li><a :href="'mailto:' + email">邮箱</a></li>
        <li><a :href="'tel:' + phone">电话</a></li>
        <li><a :href="github" target="_blank" rel="noopener">GitHub</a></li>
      </ul>
      <span class="footer-copy">&copy; {{ year }} {{ name }}</span>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  name: String,
  email: String,
  phone: String,
  github: String,
  year: Number
})
</script>
