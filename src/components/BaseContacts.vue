<template>
  <div class="contacts">
    <div class="contacts__toolbar">
      <div class="container contacts__toolbar-container">
        <BaseSelect :options="[
                      {
                        value: 'all',
                        text: 'Все'
                      },
                      ...contactsStore.categoriesList
                    ]"
                    @update:value="category => contactsStore.setActiveCategory(category)"
        />

        <BaseButton :variation="'secondary'"
                    @click="contactsStore.callNewContactForm"
        >
          <template #iconLeft>
            <IconPlus />
          </template>
          Добавить контакт
        </BaseButton>
      </div>
    </div>
    <div class="container contacts__container">
      <div class="contacts__head">
        <div class="contacts__row">
          <div class="contacts__cell">
            <h3 class="contacts__cell-title">Контакт</h3>
          </div>
          <div class="contacts__cell contacts__cell--doubled">
            <div class="contacts__cell">
              <p class="contacts__cell-title">Телефон</p>
            </div>
            <div class="contacts__cell">
              <p class="contacts__cell-title">E-mail</p>
            </div>
          </div>
          <div class="contacts__cell">
            <p class="contacts__cell-title">Создан</p>
          </div>
        </div>
      </div>
      <div class="contacts__body">
        <ContactsRow v-for="contact in contactsStore.filterContactsByCategory()"
                     :contact="contact"
                     @click="emitCallEditContactForm(contact)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from "./BaseSelect.vue";
import BaseButton from "./BaseButton.vue";
import ContactsRow from "./ContactsRow.vue";
import IconPlus from "./icons/IconPlus.vue";

import {useContactsStore} from "./../stores/ContactsStore";

import {reactive, ref, watch} from "vue";

export default {
  components: {
    BaseSelect,
    BaseButton,
    ContactsRow,
    IconPlus,
  },
  emits: [
      'call-edit-contact-form'
  ],
  setup(_, {emit}) {
    const contactsStore = useContactsStore();

    const emitCallEditContactForm  = (contact) => {
      emit('call-edit-contact-form', contact);
      contactsStore.callEditContactForm(contact)
    }

    return { contactsStore, emitCallEditContactForm }
  }
}
</script>

<style scoped lang="scss">
  .contacts__toolbar {
    padding-top: 0.8em;
    padding-bottom: 0.8em;
    font-size: 1rem;
    border: 0.1em solid #EAF2FD;
    background: #F9FCFF;
    margin-bottom: 1.4em;

    @media (max-width: 1199px) {
      padding-top: 0.5em;
      padding-bottom: 0.6em;
      margin-bottom: 1.6em;
    }
    @media (max-width: 991px) {
      padding-top: 0.8em;
      padding-bottom: 0.8em;
      margin-bottom: 2em;
    }
    @media (max-width: 767px) {
      padding-top: 0.65em;
      padding-bottom: 0.65em;
      margin-bottom: 1.8em;
    }
    @media (max-width: 575px) {
      margin-bottom: 1.5em;
    }
  }
  .contacts__toolbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .contacts__head {
    margin-bottom: 0.2em;
  }
</style>