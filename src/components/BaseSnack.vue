<template>
  <div class="snack">
    <span v-if="$slots['icon']" class="snack__icon">
      <slot name="icon"></slot>
    </span>
    <p class="snack__message"><slot></slot></p>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.7) translateY(2em);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  .snack {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1rem;
    border-radius: 0.4em;
    background: var(--bg-app);
    box-shadow: 0px 0px 1.6em 0px rgba(176, 197, 222, 0.50);
    padding: 1.6em 1.2em 1.6em 0.8em;
    transform-origin: center bottom;
    animation: pop-in 0.4s;

    @media (max-width: 767px) {
      background: var(--fg-regular);
      padding: 1.2em 1.6em;
      border-radius: 99em
    }
  }
  .snack__icon {
    font-size: 1em;
    --size: 2.4em;
    width: var(--size);
    min-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    display: block;
    margin-right: 0.05em;

    @media (max-width: 767px) {
      --size: 1.6em;
      margin-right: 0.4em;
    }
  }

  .snack__icon > * {
    display: block;
    width: 100%;
    height: 100%;
  }
  .snack__message {
    color: var(--fg-second);
    font-family: var(--ff-regular);
    font-size: 1.4em;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;

    @media (max-width: 767px) {
      color: var(--bg-app);
      font-size: 1.2em;
      margin-top: 0.1em;
    }
  }

</style>