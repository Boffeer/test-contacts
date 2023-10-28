<template>
  <header class="header">
    <div class="container header__container">
      <a class="header-logo" href="#" v-if="!contactsStore.isFormVisible">
        <img class="header-logo__icon" src="../assets/logo.svg" alt="Книга контактов" >
        <span class="header-logo__caption">Книга контактов</span>
      </a>
    </div>
  </header>
</template>

<script>
import {useContactsStore} from "../stores/ContactsStore";

export default {
  setup() {
    const contactsStore = useContactsStore();

    return {
      contactsStore,
    }
  }
}
</script>

<style scoped lang="scss">
  .header {
    background: var(--bg-dark);
    color: var(--fg-on);
    font-size: 1rem;
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    --p-container: 4.8em;
  }
  .header__container {
    max-width: 100%;
  }
  .header-logo {
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .header-logo__icon {
    max-width: 4.2em;
    min-width: 4.2em;
    width: 100%;
    height: 3.2em;
    min-height: 3.2em;
    margin-right: 1.6em;
  }
  .header-logo__caption {
    color: inherit;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
</style>