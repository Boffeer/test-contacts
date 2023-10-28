<script setup>
import BaseSnack from "./components/BaseSnack.vue";
import BaseHeader from "./components/BaseHeader.vue";
import BaseContacts from "./components/BaseContacts.vue";
import EditContact from "./components/EditContact.vue";
import IconSuccess from "./components/icons/IconSuccess.vue";

import {reactive} from "vue";

const notifications = reactive([
  {
    message: 'Контакт успешно изменён',
    icon: IconSuccess
  },
])

</script>

<template>
  <BaseHeader></BaseHeader>
  <main class="main">
    <BaseContacts></BaseContacts>
    <EditContact></EditContact>
  </main>

  <div v-if="false" class="notification-area">
    <BaseSnack v-for="snack in notifications">
      <template v-if="snack.icon" #icon>
        <component :is="snack.icon"></component>
      </template>
      {{ snack.message }}
    </BaseSnack>
  </div>

</template>

<style scoped>
.notification-area {
  font-size: 1rem;
  position: fixed;
  left: 3.2em;
  bottom: 4.8em;
  z-index: 5;
  display: inline-grid;
  row-gap: 1.2em;
  justify-items: start;
}
</style>
