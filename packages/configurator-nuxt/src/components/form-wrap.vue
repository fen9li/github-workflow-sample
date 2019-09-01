<script>
export default {
  name: 'FormWrap',
  props: {
    form: {
      type: null
    }
  },
  watch: {
    form: {
      handler() {
        this.sendUpdateWidgetRequest()
      },
      deep: true
    }
  },
  methods: {
    sendUpdateWidgetRequest() {
      // do smth
    }
  }
}
</script>

<template>
  <div class="form-wrap">
    <slot />
  </div>
</template>

<style lang="scss">
.form-wrap {
  padding-right: 1rem;
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-item {
  margin-bottom: 1.5rem;
}

.form-title {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  font-family: arial,serif;
  font-weight: bold;

  &--small {
    font-size: .8rem;
    font-weight: normal;
  }
}
</style>
