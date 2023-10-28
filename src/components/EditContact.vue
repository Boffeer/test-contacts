<template>
  <Teleport to=".header__container">
    <div class="edit-contact__header" v-if="contactsStore.isFormVisible">
      <div class="edit-contact__header-title">
        <div class="edit-contact__header-icon">
          д
        </div>
        <div class="edit-contact__header-name">
          двери вадим
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
        <BaseButton variation="primary">
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

import {useForm} from "../use/form"
import {useContactsStore} from "../stores/ContactsStore";

import {required, minLength, phone, email} from "../helpers/validators";

import {ref, reactive, computed, watch} from "vue";


export default {
  components: {
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
        validators: {phone},
        errorMessages: {
          required,
          phone: 'Некорректный номер',
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

    const submit = () => {
      for (const key in form.elements) {
        form.elements[key].touched = true;
      }

      if (form.valid) {

        const contact = {
          name: form.elements.name.value,
          phone: form.elements.tel.value,
          email: form.elements.email.value,
          category: form.elements.category.value,
        }
        contactsStore.createContact(contact);
      }
    };

    return {
      form,
      submit,
      contactsStore
    }
  }
}

</script>

<style lang="scss">
  .edit-contact {
    padding-top: 2.4em;
    font-size: 1rem;
    background-color: #F9FCFF;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 95%;
    transition: all 0.45s ease;
    transform: translateX(100%);
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
  }
  .edit-contact__title {
    color: var(--fg-regular);
    font-family: var(--ff-regular);
    font-size: 3.2em;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 0.75em;
  }
  .edit-contact__fieldset {
    display: grid;
    row-gap: 1.6em;
    margin-bottom: 3.2em;
  }
  .edit-contact__buttons {
    padding-left: 16.6em;
    display: flex;
  }
  .edit-contact__buttons > *:not(:last-child) {
    margin-right: 2.4em;
  }

  .edit-contact__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .edit-contact__header-title {
    margin-left: auto;
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
  }

  .edit-contact__button-close > * {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>