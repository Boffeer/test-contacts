<template>
  <div class="contacts__row">
    <div class="contacts__cell">
      <div class="contacts__cell-icon">{{ contact.name[0] }}</div>
      <p class="contacts__cell-value">{{ contact.name }}</p>
    </div>
    <div class="contacts__cell contacts__cell--doubled">
      <div class="contacts__cell">
        <a class="contacts__cell-value" :href="getLinkTel(contact.tel)">{{ contact.tel }}</a>
      </div>
      <div class="contacts__cell">
        <a class="contacts__cell-value" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </div>
    </div>
    <div class="contacts__cell">
      <p class="contacts__cell-value">{{ contact.created }}</p>
    </div>
  </div>
</template>

<script>
import {getLinkTel} from "../helpers/transformers";
import {useContactsStore} from "../stores/ContactsStore";
// import {ref} from "vue";

export default {
  props: {
    contact: {
      type: Object,
      required: true,
    }
  },
  setup() {
    const contactsStore = useContactsStore();

    return {
      getLinkTel,
      contactsStore,
    }
  }
}
</script>

<style lang="scss">
  .contacts__row {
    display: grid;
    grid-template-columns: 1.85fr 2fr 1fr;
    column-gap: 1em;
    font-size: 1rem;
    align-items: center;
    border-bottom: 0.1em solid #EAF2FD;
    cursor: pointer;

    @media (max-width: 1919px) {
      grid-template-columns: 1.9fr 2fr 1fr;
    }

    @media (max-width: 991px) {
      grid-template-columns: 1.6fr 2fr 1fr;
    }
    @media (max-width: 767px) {
      grid-template-columns: 1.5fr 2fr 1fr;
      column-gap: 3rem;
    }
    @media (max-width: 575px) {
      grid-template-columns: 1.5fr 1.6fr 0.3fr;
      column-gap: 1em;
    }
  }
  .contacts__row:last-child {
    border-bottom: none;
  }

  .contacts__cell {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .contacts__row > .contacts__cell {
    padding-top: 1.2em;
    padding-bottom: 1.2em;
    
    @media (max-width: 991px) {
      padding-top: 1.25em;
      padding-bottom: 1.25em;
    }
    @media (max-width: 767px) {
      padding-top: 0.5em;
      padding-bottom: 0.5em;
    }
    @media (max-width: 575px) {
      padding-top: 0.9em;
      padding-bottom: 0.9em;
    }
  }
  .contacts__row > .contacts__cell:last-of-type {
    justify-self: end;
  }

  .contacts__head .contacts__cell {
    padding-top: 0;
    padding-bottom: 0;
  }
  .contacts__head .contacts__cell--doubled .contacts__cell:last-child .contacts__cell-title:before {
    @media (max-width: 767px) {
      content: "/";
      margin-left: 0.3em;
      margin-right: 0.3em;
    }
  }


  .contacts__cell--doubled {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 1919px) {
      display: grid;
      grid-template-columns: 0.85fr 1fr;
      column-gap: 2em;
    }
    @media (max-width: 991px) {
      grid-template-columns: 0.6fr 1fr;
    }
    @media (max-width: 767px) {
      display: flex;
      flex-wrap: wrap;
      column-gap: 0;
    }
  }

  .contacts__body .contacts__cell--doubled .contacts__cell {
    display: block;
    width: 100%;
  }

  .contacts__cell-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    --size: 2em;
    min-width: var(--size);
    width: var(--size);
    min-height: var(--size);
    height: var(--size);
    border-radius: 5.6em;
    background: #FFC700;
    margin-right: 0.7em;
    color: var(--fg-regular);
    text-align: center;
    font-family: var(--ff-regular);
    font-size: 1.2em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    @media (max-width: 991px) {
      --size: 2.2em;
    }
    @media (max-width: 575px) {
      display: none;
    }
  }

  .contacts__cell-value {
    color: var(--fg-regular);
    font-family: var(--ff-regular);
    font-size: 1.4em;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;

    @media (max-width: 991px) {
      font-size: 1.3em;
    }
    @media (max-width: 767px) {
      font-size: 1.2em;
    }
  }

  .contacts__row > .contacts__cell:last-of-type .contacts__cell-value {
    @media (max-width: 1919px) {
      font-size: 1.4em;
    }
    @media (max-width: 767px) {
      font-size: 1.2em;
    }
  }

  a.contacts__cell-value {
    font-size: 1.2em;

    @media (max-width: 991px) {
      font-size: 1.3em;
    }
    @media (max-width: 767px) {
      font-size: 1.2em;
    }
  }

  .contacts__cell-title {
    color: var(--fg-second);
    font-size: 1em;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;
    text-transform: uppercase;
  }
</style>