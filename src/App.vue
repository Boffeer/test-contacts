<script setup>
import BaseHeader from "./components/BaseHeader.vue";
import BaseContacts from "./components/BaseContacts.vue";
import EditContact from "./components/EditContact.vue";
import NotificationArea from "./components/NotificationArea.vue";

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

  <NotificationArea />
</template>

<style scoped>
</style>
