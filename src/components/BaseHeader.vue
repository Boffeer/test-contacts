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

    @media (max-width: 1199px) {
      --p-container: 3em;
    }
    @media (max-width: 991px) {
      --p-container: 3.3em;
      padding-top: 0.75em;
      padding-bottom: 0.75em;
    }
    @media (max-width: 991px) {
      padding-top: 0.55em;
      padding-bottom: 0.55em;
    }
    @media (max-width: 767px) {
      --p-container: 1.1em;
      padding-top: 0.8em;
      padding-bottom: 0.8em;
    }
  }
  .header__container {
    max-width: 100%;
  }

  @keyframes fade-in-right {
    from {
      opacity: 0;
      transform: translateX(-2em);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .header-logo {
    color: inherit;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    animation: fade-in-right 0.35s;
  }
  .header-logo__icon {
    max-width: 4.2em;
    min-width: 4.2em;
    width: 100%;
    height: 3.2em;
    min-height: 3.2em;
    margin-right: 1.6em;

    @media (max-width: 991px) {
      max-width: 3.6em;
      min-width: 3.6em;
      height: 2.8em;
      min-height: 2.8em;
      margin-right: 1em;
    }
    @media (max-width: 767px) {
      max-width: 3.4em;
      min-width: 3.4em;
      height: 2.6em;
      min-height: 2.6em;
      margin-right: 0.7em;
    }
    @media (max-width: 575px) {
      max-width: 3.4em;
      min-width: 3.2em;
      height: 2.4em;
      min-height: 2.4em;
      margin-right: 0.3em;
    }
  }
  .header-logo__caption {
    color: inherit;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 991px) {
      font-size: 1.5em;
    }
    @media (max-width: 575px) {
      font-size: 1.4em;
    }
  }
</style>