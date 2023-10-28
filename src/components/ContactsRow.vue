<template>
  <div class="contacts__row">
    <div class="contacts__cell">
      <div class="contacts__cell-icon">{{ contact.name[0] }}</div>
      <p class="contacts__cell-value">{{ contact.name }}</p>
    </div>
    <div class="contacts__cell contacts__cell--doubled">
      <div class="contacts__cell">
        <a class="contacts__cell-value" href="tel:+79876547809">{{ contact.phone }}</a>
      </div>
      <div class="contacts__cell">
        <a class="contacts__cell-value" href="mailto:nelfeelingood@gmail.com">{{ contact.email }}</a>
      </div>
    </div>
    <div class="contacts__cell">
      <p class="contacts__cell-value">{{ getFormattedDate(contact.created) }}</p>
    </div>
  </div>
</template>

<script>
const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);

  return `${day}.${month}.${year}`
}

export default {
  props: {
    contact: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    // props.contact.created = getFormattedDate(props.contact.created);
    // console.log(props.contact)

    return {
      contact: props.contact,
      getFormattedDate,
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
  }
  .contacts__row > .contacts__cell:last-of-type {
    justify-self: end;
  }

  .contacts__head .contacts__cell {
    padding-top: 0;
    padding-bottom: 0;
  }


  .contacts__cell--doubled {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
  }

  .contacts__cell-value {
    color: var(--fg-regular);
    font-family: var(--ff-regular);
    font-size: 1.4em;
    font-style: normal;
    font-weight: 400;
    line-height: 1.6;
  }
  a.contacts__cell-value {
    font-size: 1.2em;
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