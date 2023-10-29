<script setup>
import BaseHeader from "./components/BaseHeader.vue";
import BaseContacts from "./components/BaseContacts.vue";
import EditContact from "./components/EditContact.vue";
import NotificationArea from "./components/NotificationArea.vue";
</script>

<template>
  <BaseHeader/>
  <main class="main">
    <BaseContacts/>
    <EditContact/>
  </main>

  <NotificationArea />
</template>

<style scoped>
</style>
