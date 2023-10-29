<template>
  <div class="notification-area">
    <BaseSnack v-for="snack in notificationsStore.notifications">
      <template #icon>
        <IconSuccess/>
      </template>
      {{ snack.message }}
    </BaseSnack>
  </div>
</template>

<script>
import BaseSnack from "./BaseSnack.vue";
import IconSuccess from "./icons/IconSuccess.vue";
import {useNotificationsStore} from "../stores/NotificationsStore";

export default {
  components: {
      BaseSnack,
      IconSuccess
  },
  setup() {
    const notificationsStore = useNotificationsStore()

    return {notificationsStore};
  }
}
</script>

<style scoped lang="scss">
  .notification-area {
    font-size: 1rem;
    position: fixed;
    left: 3.2em;
    bottom: 4.8em;
    z-index: 5;
    display: inline-grid;
    row-gap: 1.2em;
    justify-items: start;

    @media (max-width: 767px) {
      top: 6.5rem;
      left: 0;
      bottom: unset;
      width: 100%;
      justify-items: center;
    }
  }
</style>