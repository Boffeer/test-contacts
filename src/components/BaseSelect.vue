<template>
  <div class="select" :class="{
    'select--active': isSelectOpened,
    'select--has-label': typeof label === 'string',
    'is-invalid': !valid && touched,
  }">
    <select class="select__input"
            tabindex="-1"
            v-model="internalValue"
    >
      <option v-for="option in options" :value="option.value">{{ option.text }}</option>
    </select>
    <label class="select__area">
      <p v-if="label" class="select__label">{{ label }}</p>
      <span class="select__control">
        <button class="select__toggle" type="button" @click="toggleSelect">
          <span class="select__value">{{ placeholder }}</span>
          <span class="select__icon">
            <IconError v-if="valid == false && touched"/>
            <IconAngleBottom v-else />
          </span>
        </button>
        <ul class="select__list">
          <li v-for="option in options" class="select__element">
            <button class="select__button"
                    :class="{'select__button--active': internalValue == option.value }"
                    type="button"
                    @click="internalValue = option.value; toggleSelect()"
            >
              <span class="select__button-text">{{ option.text }}</span>
              <IconYes v-if="internalValue == option.value" class="select__button-icon" />
            </button>
          </li>
        </ul>
        <small v-if="errors.required && touched" class="select__error">{{ errors.required }}</small>
      </span>
    </label>
  </div>
</template>

<script>
import {ref, watch, computed, reactive} from 'vue';
import IconYes from "./icons/IconYes.vue"
import IconAngleBottom from "./icons/IconAngleBottom.vue";
import IconError from "./icons/IconError.vue";

export default {
  components: {
    IconError,
    IconYes,
    IconAngleBottom
  },
  props: {
    label: String,
    options: {
      type: Array,
      default: [],
      required: true,
    },
    placeholder: {
      type: [String, Boolean],
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    valid: Boolean,
    errors: {
      type: Object,
      default: {},
    },
    touched: {
      type: Boolean,
    }
  },
  emits: [
      'update:value',
  ],
  setup(props, {emit}) {
    const isSelectOpened = ref(false);
    const internalValue = ref(props.value);

    const options = ref(props.options);
    const placeholder = ref(props.placeholder);
    const initialPlaceholder = props.placeholder;

    watch( () => props.value, (newVal) => {
      internalValue.value = newVal;
    })

    watch(internalValue, (newVal) => {
      if (newVal == false) {
        placeholder.value = initialPlaceholder;
      } else {
        placeholder.value = options.value.find(option => {
          return option.value == newVal;
        }).text
      };

      emit('update:value', newVal);
    })

    // watch(selectValue, (currentOption) => {
    // });

    if (placeholder.value === false) {
      internalValue.value = options.value[0].value;
    }



    const openSelect = () => {
      isSelectOpened.value = true;
    }
    const closeSelect = () => {
      isSelectOpened.value = false;
    }
    const toggleSelect = () => {
      if (isSelectOpened.value) {
        closeSelect();
        return;
      }
      openSelect();
    }

    return {
      isSelectOpened,
      // selectValue,
      options,
      placeholder,
      IconYes,
      IconAngleBottom,
      toggleSelect,
      internalValue
    }
  }
}

/*
function initSelects(selectNodes) {
  selectNodes.forEach(selectNode => {
    if (selectNode.classList.contains('is-init')) return;

    const inputNode = selectNode.querySelector('.form-select__input');
    const toggleNode = selectNode.querySelector('.form-select__toggle');
    const buttonNodes = [...selectNode.querySelectorAll('.form-select__button')];

    toggleNode.addEventListener('click', handleToggle);


    buttonNodes.forEach((buttonNode, index, arr) => {
      buttonNode.addEventListener('click', () => {
        buttonNodes.forEach(buttonNode => buttonNode.classList.remove('form-select__button--active'));
        buttonNode.classList.add('form-select__button--active');
        inputNode.selectedIndex = index + 1;
        toggleNode.classList.add('form-select__toggle--selected');
        toggleNode.textContent = buttonNode.textContent;
      });
    });


    selectNode.classList.add('is-init')
  });
}
//*/


// function handleToggle(evt) {
//   evt.stopPropagation();
//   selectNode.classList.toggle('select--active');
//
//   if (selectNode.classList.contains('select--active')) {
//     toggleNode.removeEventListener('click', handleToggle);
//     document.addEventListener('click', handleDocument);
//   }
// }
//
// function handleDocument(e) {
//   selectNode.classList.remove('select--active');
//
//   document.removeEventListener('click', handleDocument);
//   selectNode.addEventListener('click', handleToggle);
// }

</script>

<style scoped lang="scss">
.select {
  --fg: var(--fg-regular);
  --c-selected: #222;
  --border-color: #DDD;
  --bg: #fff;
  --bg-list: #fff;
  --bg-list-hover: #EAF2FD;

  --padding: 1em 0.8em;

  --fz: 1.4em;
  --fw: 400;
  --lh: 1.42;
  --brad: 0.4em;

  --error-color: var(--c-error);
  --error-fz: 1em;

  --icon-size: 1.6em;

  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  max-width: 23.5em;
  width: 100%;

  //@media (max-width: $tablet) {
  //  --padding: 1.55rem 3.1rem 1.55rem 1rem ;
  //  --fz: 1.6rem;
  //}
}

.select--has-label {
  max-width: 100%;
  --padding: 0.8em;
  --lh: 1.6;
}


.select__label {
  color: var(--fg-label);
  font-family: var(--ff-regular);
  font-size: 1.4em;
  font-style: normal;
  line-height: 1.2;
  font-weight: 700;
}

.select__icon {
  font-size: 1em;
  transition: all 0.3s ease;
  min-width: var(--icon-size);
  width: var(--icon-size);
  min-height: var(--icon-size);
  height: var(--icon-size);
}
.select__icon > *{
  display: block;
  width: 100%;
  height: 100%;
}
.select--active:not(.is-invalid) .select__icon {
  transform: rotate(-180deg);
  transform-origin: center;
}

.select__input {
  position: absolute;
  transform: scale(0);
}
.select.is-invalid .select__toggle {
  --fg: var(--c-error);
}

.select__area {
  width: 100%;
  display: block;
}
.select--has-label .select__area {
  display: grid;
  grid-template-columns: 13.6em auto;
  column-gap: 3.2em;
  align-items: center;
}
.select--has-label .select__control {
  position: relative;
}


.select__toggle {
  position: relative;
  padding: var(--padding);
  font-family: var(--ff-regular);
  color: var(--fg);
  font-size: inherit;
  font-weight: 700;
  line-height: var(--lh);
  text-align: left;
  background: var(--bg);
  border-radius: var(--brad);
  transition: var(--tr-regular);
  border: 0.1em solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.select__value {
  font-size: var(--fz);
  text-transform: uppercase;
}
.select--has-label .select__value {
  font-weight: 400;
  text-transform: initial;
}

.select__toggle:focus {
  --border-color: var(--c-focus);
}
.select__toggle:hover {
  @media (any-hover:hover) {
    --border-color: var(--c-focus);
  }
}

.select__toggle--selected {
  color: var(--c-selected);
}

.select__list {
  position: absolute;
  left: 0;
  top: 100%;
  right: 0;
  z-index: 2;
  display: grid;
  border-radius: var(--brad);
  background: var(--bg-list);
  opacity: 0;
  visibility: hidden;
  transition: var(--tr-regular);
  transform: translateY(-2rem);
  box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
  margin-top: 0.8em;
  pointer-events: none;

  //@media (max-width: $tablet) {
  //  padding: 2rem;
  //  gap: 2rem;
  //}
}
.select--active .select__list {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  pointer-events: initial;
}

.select__button {
  position: relative;
  // padding-left: 4rem;
  color: var(--fg);
  font-family: var(--ff-regular);
  font-weight: var(--fw);
  font-size: var(--fz);
  line-height: var(--lh);
  text-align: left;
  padding: 1em 0.8em 1em 1.6em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.3s ease;

  //@media (max-width: $tablet) {
  //  // padding-left: 3rem;
  //}
}

.select__button--active {
  text-transform: uppercase;
  font-weight: 700;
}


.select__button:focus {
  color: var(--c-selected);
}
.select__button:hover {
  @media (any-hover:hover) {
    background: var(--bg-list-hover);
  }
}

.select.is-invalid {
  --border-color: var(--error-color, #FF3b30);
  --fg: var(--error-color, #FF3b30);
  --fg-placeholder: var(--error-color, #FF3b30);
}
.select.is-invalid .select__toggle {
  --border-color: var(--error-color, #FF3b30);
}

.select__error {
  display: block;
  padding-left: var(--padding-inline);
  padding-right: var(--padding-inline);
  font-family: sans-serif;
  font-size: var(--error-fz, 1rem);
  color: var(--error-color);
  line-height: 1;
  min-height: var(--error-fz);
  transition: inherit;
  padding-top: 0.5em;
  margin-top: -1.5em;
  opacity: 0;
  max-height: 1em;
  text-align: right;
}
.is-invalid .select__error {
  margin-top: 0;
  opacity: 1;
  max-height: 10rem;
}

</style>