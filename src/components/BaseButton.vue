<template>
  <button :class="{
            'button-primary': variation === undefined || variation === 'primary',
            'button-secondary': variation === 'secondary',
            'button-thirdly': variation === 'thirdly',
            'button--loading': loading,
          }"
  >
    <span v-if="$slots['iconLeft']" class="button__icon">
      <IconLoading v-if="loading"/>
      <slot v-if="!loading" name="iconLeft"></slot>
    </span>
    <span class="button__text">
      <slot>Кнопка</slot>
    </span>
    <span  v-if="$slots['iconRight']" class="button__icon">
      <IconLoading v-if="loading"/>
      <slot v-if="!loading" name="iconRight"></slot>
    </span>
  </button>
</template>

<script>
import IconLoading from "./icons/IconLoading.vue";
export default {
  components: {IconLoading},
  props: {
    variation: String,
    loading: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
  }
}
</script>

<style lang="scss">
.button-primary,
.button-secondary,
.button-thirdly {
  --padding: var(--padding-block) var(--padding-inline);
  --icon-width: auto;
  --icon-height: 1.6em;
  --icon-gap: 0.4em;

  --c-disabled: #4B4B4B;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: var(--padding);

  border: var(--border-width) solid var(--border-color);
  background: var(--bg);
  border-radius: var(--border-radius);

  font-family: var(--ff);
  font-size: 1rem;
  font-weight: var(--fw);
  line-height: var(--lh);
  letter-spacing: var(--ls);
  color: var(--fg);

  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary {
  --ff: var(--ff-regular);
  --fz: 1.4rem;
  --fw: 600;
  --lh: 1.2;
  --ls: initial;

  --padding-block: 1.2em;
  --padding-inline: 1.6em;

  --fg: var(--fg-regular);
  --bg: var(--c-primary);
  --bg-hover: var(--c-primary-hover);
  --bg-active: var(--c-primary-active);

  --border-width: 0;
  --border-color: transparent;
  --border-radius: 0.4em;

  text-transform: uppercase;
}
.button-primary:hover {
  @media (any-hover:hover) {
    --bg: var(--bg-hover);
  }
}
.button-primary:active {
  --bg: var(--bg-active);
}

.button-secondary {
  --button-color: var(--c-secondary);
  --ff: var(--ff-regular);
  --fz: 1.2em;
  --fw: 700;
  --lh: 1.33;

  --padding-block: 0.7em;
  --padding-inline: 1.6em;

  --fg: var(--button-color);
  --bg: transparent;

  --border-width: 0.1rem;
  --border-color: var(--button-color);
  --border-radius: 9999px;

  text-transform: uppercase;
}

.button-thirdly {
  --icon-width: 1.2em;
  --icon-height: 1.2em;
  --icon-gap: 0.2em;
  --fg: var(--c-secondary);
  --fz: 1.2em;
}

.button__text {
  font-size: var(--fz);
  color: inherit;
  font-weight: inherit;
  font-family: inherit;
}
.button-primary .button__text {
  margin-top: 0.2em;
}
.button-thirdly .button__text {
  margin-top: 0.1em;
}


.button__icon {
  width: var(--icon-width);
  min-width: var(--icon-width);
  height: var(--icon-height);
  min-height: var(--icon-height);
  display: block;
  --icon-color: var(--fg);
  transition: inherit;
}
.button__icon svg {
  display: block;
  width: 100%;
  height: 100%;
}

.button__icon:first-child {
  margin-right: var(--icon-gap);
}
.button__icon:last-child {
  margin-left: var(--icon-gap);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

}

.button--loading.button-primary {
  --bg: var(--bg-active);
  pointer-events: none;
}
.button--loading .button__icon > * {
  animation: rotate 2s infinite linear;
}

</style>