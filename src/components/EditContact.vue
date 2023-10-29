<template>
  <Teleport to=".header__container">
    <div class="edit-contact__header" v-if="contactsStore.isFormVisible">
      <div class="edit-contact__header-title">
        <div class="edit-contact__header-icon" :class="{'edit-contact__header-icon--user-profile': currentContact != null}">
          <template v-if="currentContact == null">
            <IconNewContact />
          </template>
          <template v-else>
            {{ currentContact.name[0] }}
          </template>
        </div>
        <div class="edit-contact__header-name">
          <template v-if="currentContact == null">
            Добавить контакт
          </template>
          <template v-else>
            {{ currentContact.name }}
          </template>
        </div>
      </div>
      <button class="edit-contact__button-close" @click="contactsStore.closeContactForm">
        <IconClose />
      </button>
    </div>
  </Teleport>
  <div class="edit-contact" :class="{'edit-contact--visible': contactsStore.isFormVisible}">
    <form class="edit-contact__form" @submit.prevent="submit">
      <h3 class="edit-contact__title">
        <template v-if="contactsStore.formType === 'create'">
          Новый контакт
        </template>
        <template v-else-if="contactsStore.formType === 'edit'">
          Контакт
        </template>
      </h3>
      <fieldset class="edit-contact__fieldset">
        <template v-for="field of form.elements">
        <component v-if="field.showCondition()"
                   :key="field.name"
                   :is="field.component"
                   :label="field.label"
                   :type="field.type"
                   :placeholder="field.placeholder"
                   :errors="field.errors"
                   :valid="field.valid"
                   :value="field.value"
                   :touched="field.touched"
                   :options="field.options"
                   @update:value="newValue => field.value = newValue"
                   @update:touched="field.blur"
        ></component>
        </template>
      </fieldset>
      <div class="edit-contact__buttons">
        <BaseButton variation="primary" :loading="form.loading">
          <template v-slot:iconLeft>
            <IconSave />
          </template>
          Сохранить
        </BaseButton>
        <BaseButton variation="thirdly"
                    v-if="contactsStore.formType == 'edit'"
                    @click.prevent="contactsStore.deleteCurrentContact"
        >
          <template v-slot:iconLeft>
            <IconDelete />
          </template>
          Удалить контакт
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import BaseSelect from "./BaseSelect.vue";
import BaseButton from "./BaseButton.vue";

import IconDelete from "./icons/IconDelete.vue";
import IconSave from "./icons/IconSave.vue";
import IconLoading from "./icons/IconLoading.vue";
import IconClose from "./icons/IconClose.vue";
import IconNewContact from "./icons/IconNewContact.vue";

import {useForm} from "../use/form"
import {useContactsStore} from "../stores/ContactsStore";

import {required, minLength, tel, email} from "../helpers/validators";

import {storeToRefs} from "pinia";

import {ref, reactive, computed, watch} from "vue";
import {getFormattedDate} from "../helpers/transformers";


export default {
  components: {
    IconNewContact,
    IconClose,
    BaseInput,
    BaseSelect,
    BaseButton,
    IconDelete,
    IconSave,
    IconLoading,
  },
  setup() {

    const contactsStore = useContactsStore();
    const currentContact = ref(null);

    const {currentContactId} = storeToRefs(contactsStore)

    const form = useForm({
      name: {
        label: 'Имя',
        type: 'text',
        placeholder: 'Например «Андрей»...',
        value: '',
        validators: {
          required,
          minLength: minLength(3, true)
        },
        errorMessages: {
          minLength: 'Слишком короткое имя',
        },
        showCondition: () => true,
      },

      tel: {
        label: 'Телефон',
        type: 'tel',
        placeholder: '+7(___)-___-__-__',
        value: '',
        validators: {tel},
        errorMessages: {
          required,
          tel: 'Некорректный номер',
        },
        showCondition: () => true,
      },
      email: {
        label: 'E-mail',
        type: 'email',
        placeholder: 'Например «pochta@domain.ru»...',
        value: '',
        validators: {email},
        errorMessages: {
          required,
          email: 'Некорректный e-mail',
        },
        showCondition: () => true,
      },
      category: {
        label: 'Категория',
        type: 'select',
        options: [
          {
            value: 'kinsfolk',
            text: 'Родственники'
          },
          {
            value: 'colleague',
            text: 'Коллеги'
          }
        ],
        placeholder: 'Не выбрано',
        value: '',
        validators: {
          required,
        },
        showCondition: () => true,
      },
      created: {
        label: 'Создан',
        type: 'readonly',
        placeholder: '',
        value: '',
        showCondition: () => {
          return contactsStore.formType == 'edit'
        },
      },
    });

    watch(currentContactId, (newVal, oldVal) => {
      currentContact.value = contactsStore.getCurrentContact();

      let valueToSet = '';
      for (const key in form.elements) {
        if (currentContact.value != null) valueToSet = currentContact.value[key]
        form.elements[key].value = valueToSet;
        form.elements[key].touched = false;
      }
    })

    const updateContact = () => {
      const contact = contactsStore.getCurrentContact();
      contact.name = form.elements.name.value
      contact.tel = form.elements.tel.value
      contact.email = form.elements.email.value
      contact.category = form.elements.category.value

      contactsStore.updateContact(contact)
    }

    const createContact = () => {
      const contact = {
        name: form.elements.name.value,
        tel: form.elements.tel.value,
        email: form.elements.email.value,
        category: form.elements.category.value,
      }

      contactsStore.createContact(contact);
    }

    const submit = () => {
      for (const key in form.elements) {
        form.elements[key].touched = true;
      }

      if (!form.valid) return;
      form.loading = true;

      setTimeout(() => {
        const formMethods = {
          'create': () => createContact(),
          'edit': () => updateContact(),
        }
        form.loading = false;
        formMethods[contactsStore.formType]()


        setTimeout(() => {
          for (const key in form.elements) {
            form.elements[key].touched = false;

            if (contactsStore.formType === 'edit') return;

            form.elements[key].value = '';
          }
        }, 500)
      }, 3000);
    };

    return {
      form,
      submit,
      contactsStore,
      currentContact
    }
  }
}

</script>

<style lang="scss">
  .edit-contact {
    padding-top: 2.5em;
    font-size: 1rem;
    background-color: #F9FCFF;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: calc(100% - 4.8em);
    transition: all 0.45s ease;
    transform: translateX(100%);

    @media (max-width: 991px) {
      padding-top: 2.2em;
    }
    @media (max-width: 767px) {
      padding-left: 1.2em;
      padding-right: 1.2em;
      padding-top: 1.8em;
    }
  }
  .edit-contact--visible {
    transform: translateX(0);
  }

  .edit-contact__form {
    max-width: 70.4em;
    margin-left: auto;
    margin-right: auto;
    padding: 4.8em 6.4em 6.4em;
    background-color: var(--bg-app);
    box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);

    @media (max-width: 1919px) {
      padding: 4.9em 6em 6.4em;
    }
    @media (max-width: 1199px) {
      padding: 4.6em 6.7em 6.4em;
    }
    @media (max-width: 991px) {
      max-width: 76.4em;
      padding: 5.1em 7em 6.4em;
    }
    @media (max-width: 767px) {
      max-width: 100%;
      padding: 3.2em 5em 6.4em;
    }
    @media (max-width: 575px) {
      padding: 3em 1.8em 4.8em;
    }
  }
  .edit-contact__title {
    color: var(--fg-regular);
    font-family: var(--ff-regular);
    font-size: 3.2em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.75em;

    @media (max-width: 991px) {
      font-size: 2.6em;
      margin-bottom: 1em;
    }
    @media (max-width: 767px) {
      font-size: 2.5em;
    }
  }
  .edit-contact__fieldset {
    display: grid;
    row-gap: 1.6em;
    margin-bottom: 3.2em;

    @media (max-width: 1919px) {
      row-gap: 1.9em;
    }
    @media (max-width: 1199px) {
      row-gap: 1.6em;
    }
    @media (max-width: 991px) {
      margin-bottom: 3.8em;
    }
    @media (max-width: 767px) {
      row-gap: 1.75em;
      margin-bottom: 3.1em;
    }
    @media (max-width: 575px) {
      row-gap: 1.6em;
      margin-bottom: 3.4em;
    }
  }
  .edit-contact__buttons {
    padding-left: 16.6em;
    display: flex;

    @media (max-width: 991px) {
      padding-left: 18.2em;
    }
    @media (max-width: 767px) {
      padding-left: 17.1em;
    }
    @media (max-width: 575px) {
      padding-left: 0em;
      justify-content: center;
    }
  }
  .edit-contact__buttons > *:not(:last-child) {
    margin-right: 2.4em;

    @media (max-width: 991px) {
      margin-right: 3em;
    }
  }

  @keyframes fade-in-left {
    from {
      opacity: 0;
      transform: translateX(2em);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .edit-contact__header {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade-in-left 0.35s;
  }

  .edit-contact__header-title {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1rem;
    margin-right: -1.7em;

    @media (max-width: 1199px) {
      margin-right: -3em;
    }
    @media (max-width: 991px) {
      margin-right: -2.2em;
    }
    @media (max-width: 575px) {
      margin-right: -2.6em;
    }
  }

  .edit-contact__header-icon {
    --size: 2.4em;
    min-width: var(--size);
    width: var(--size);
    min-height: var(--size);
    height: var(--size);
    margin-right: 0.8em;

    @media (max-width: 991px) {
      --size: 2.2em;
      margin-right: 1em;
    }
  }
  .edit-contact__header-icon--user-profile {
    border-radius: var(--size);
    background-color: var(--c-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--fg-regular);
    font-weight: 700;
    font-family: var(--ff-regular);
  }
  .edit-contact__header-icon--user-profile span {
    font-size: 1.2em;
  }


  .edit-contact__header-name {
    color: #DDD;
    font-family: var(--ff-regular);
    font-size: 2em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 95%;

    @media (max-width: 1199px) {
      font-size: 1.5em;
    }
    @media (max-width: 991px) {
      font-size: 1.4em;
    }
  }

  .edit-contact__button-close {
    font-size: 1em;
    display: block;
    --size: 3.2em;
    min-width: var(--size);
    width: var(--size);
    min-height: var(--size);
    height: var(--size);
    margin-left: auto;
    margin-right: -1.6em;

    @media (max-width: 1199px) {
      margin-right: 0;
    }
    @media (max-width: 767px) {
      --size: 2.5em
    }
  }

  .edit-contact__button-close > * {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>