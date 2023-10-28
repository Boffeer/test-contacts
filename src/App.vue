<script setup>
import BaseSnack from "./components/BaseSnack.vue";
import BaseHeader from "./components/BaseHeader.vue";
import BaseContacts from "./components/BaseContacts.vue";
import EditContact from "./components/EditContact.vue";
import IconSuccess from "./components/icons/IconSuccess.vue";

import {reactive, ref} from "vue";

const notifications = ref([]);

const currentContact = ref({});

const handleContactChange = (contact) => {
  currentContact.value = contact;

  const id = contact.id

  notifications.value.push({
    id,
    message: 'Контакт успешно изменён',
  })

  setTimeout(() => {
    notifications.value = notifications.value.filter(snack => snack.id != id)
  }, 3000)

}

</script>

<template>
  <BaseHeader/>
  <main class="main">
    <BaseContacts @call-edit-contact-form="handleContactChange"/>
    <EditContact/>
  </main>

  <div class="notification-area">
    <BaseSnack v-for="snack in notifications">
      <template #icon>
        <IconSuccess/>
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
