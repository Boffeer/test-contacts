<template>
  <label class="input"
         :class="{
            'input--has-label': typeof label == 'string',
            'is-invalid': isInvalid,
            'is-readonly': type === 'readonly'
          }"
  >
    <span v-if="label" class="input__label">{{ label }}</span>
    <span class="input__area">
      <input v-if="type === 'tel'"
          class="input__field"
          :name="type"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :type="type"
          :readonly="type === 'readonly'"
          v-model="internalValue"
          v-mask="'+7 (###) ###-##-##'"
          @input="$emit('update:value', $event.target.value)"
          @change="$emit('update:value', $event.target.value)"
          @blur="$emit('update:touched')"
      >
      <input v-else
             class="input__field"
             :name="type"
             :autocomplete="autocomplete"
             :placeholder="placeholder"
             :type="type"
             :readonly="type === 'readonly'"
             v-model="internalValue"
             @input="$emit('update:value', $event.target.value)"
             @change="$emit('update:value', $event.target.value)"
             @blur="$emit('update:touched')"
      >
      <small v-if="errors.required && touched" class="input__error">{{ errors.required }}</small>
      <small v-else-if="errors.minLength && touched" class="input__error">{{ errors.minLength }}</small>
      <small v-else-if="errors.tel && touched" class="input__error">{{ errors.tel }}</small>
      <small v-else-if="errors.email && touched" class="input__error">{{ errors.email }}</small>
      <span v-if="isInvalid" class="input__icon">
        <IconError />
      </span>
    </span>
  </label>
</template>

<script>
import {computed, ref, watch, reactive} from 'vue';
import {mask} from 'vue-the-mask'
import IconError from "./icons/IconError.vue";

export default {
  components: {
    IconError
  },
  props: {
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'none',
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
    'update:touched',
  ],
  directives: {mask},
  setup(props) {
    const label = ref(props.label);
    const type = ref(props.type);
    const placeholder = ref(props.placeholder);
    const name = ref(props.name);
    const autocomplete = ref(props.autocomplete);
    const value = ref(props.value);

    const internalValue = ref(props.value);

    watch(() => props.value, (newVal) => {
      internalValue.value = newVal;
    })

    const isInvalid = computed(() => {
      return !props.valid && props.touched;
    });

    return {
      label,
      type,
      placeholder,
      name,
      autocomplete,
      internalValue,
      isInvalid,
    }
  }
}
</script>

<style lang="scss">
.input {
  --bg: var(--bg-app);
  --fg: var(--fg-regular);
  --fg-label: var(--fg-regular);
  --fg-placeholder: #d0d0d0;

  --fz: 1.4em;
  --padding-inline: 0.56em;
  --padding-block: 0.56em;
  --padding: var(--padding-block) var(--padding-inline);
  --letter-spacing: initial;

  --border-color: #ddd;
  --border-width: 0.1em;
  --border-radius: 0.4em;
  --border-focus: var(--c-focus);

  --error-color: var(--c-error);
  --error-fz: 1rem;

  --icon-size: 1.6em;

  display: block;
  font-size: 1rem;
  cursor: text;
  font-family: var(--ff-regular);
  transition:  all 0.3s ease;

  @media (max-width: 991px) {
    --padding-block: 1em;
    --fz: 1.2em;
  }
  @media (max-width: 767px) {
    --padding-block: 0.8em;
  }
}
.input.is-readonly {
  cursor: default;
  --border-color: transparent;
}
.input--has-label {
  display: grid;
  grid-template-columns: 13.6em auto;
  column-gap: 3.2em;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 14.9em auto;
  }
  @media (max-width: 767px) {
    grid-template-columns: 13.9em auto;
  }
  @media (max-width: 767px) {
    grid-template-columns: 7.3em auto;
    column-gap: 1.2em;
  }
}

.input__label {
  color: var(--fg-label);
  font-family: var(--ff-regular);
  font-size: 1.4em;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
}

.input__area {
  position: relative;
  display: block;
  width: 100%;
  background: var(--bg, #fff);
  font-size: inherit;
  font-family: inherit;
  transition: inherit;
  border-radius: var(--border-radius, 0.5em);
}

.input__field {
  display: block;
  width: 100%;
  padding: var(--padding);
  border: var(--border-width, 0.2rem) solid var(--border-color, #dfdfdf);
  border-radius: var(--border-radius, 0.5em);
  background: transparent;
  color: var(--fg, #333);
  font-size: var(--fz);
  font-family: inherit;
  transition: inherit;
  letter-spacing: var(--letter-spacing, initial);
}
.input.is-readonly .input__field {
  cursor: default;
}
.input__field::placeholder {
  color: var(--fg-placdeholder);
}
.input__field:focus {
  --border-color: var(--border-focus);
  caret-color: var(--border-focus);
}
.is-readonly .input__field:focus {
  --border-color: transparent;
}

.input__field:-webkit-autofill,
.input__field:-webkit-autofill:hover,
.input__field:-webkit-autofill:focus {
  --box-shadow: 0 0 0px 1000px var(--bg-app) inset !important;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
}

.input.is-invalid {
  --border-color: var(--error-color);
  --fg: var(--error-color);
  --fg-placeholder: var(--error-color);
}
.input.is-invalid .input__field {
  --border-color: var(--error-color);
  caret-color: var(--error-color);
}

.input__error {
  display: block;
  //padding-left: var(--padding-inline);
  //padding-right: var(--padding-inline);
  font-family: sans-serif;
  font-size: var(--error-fz, 1rem);
  color: var(--error-color);
  line-height: 1;
  min-height: var(--error-fz);
  transition: all 0.3s ease;
  padding-top: 0.25em;
  margin-top: -1.5em;
  opacity: 0;
  max-height: 1em;
  text-align: right;

  position: absolute;
  right: 0;
  bottom: 1em;
}
.input.is-invalid .input__error {
  bottom: -1.2em;
  margin-top: 0;
  opacity: 1;
  max-height: 10rem;
}

.input__icon {
  transform: translateY(-50%);
  transform-origin: center;
  transition: all 0.3s ease;
  min-width: var(--icon-size);
  width: var(--icon-size);
  min-height: var(--icon-size);
  height: var(--icon-size);
  position: absolute;
  top: 50%;
  right: 0.8em;
}
.is-invalid .input__icon {
  transform: translateY(-50%);
}

</style>