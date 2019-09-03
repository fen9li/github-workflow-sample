<script>
export default {
  name: "LogStatus",
  props: {
    status: {
      type: [Number, String],
      default: 200,
    },
  },
  computed: {
    computedStatus() {
      const codeType = this.status.toString().charAt(0)
      switch (codeType) {
        case '2':
          return this.status + ' OK'
        case '5':
        case '4':
          return this.status + ' ERR'
        default:
          return this.status
      }
    },
    isError() {
      return this.status.toString().charAt(0) !== '2'
    },
  },

}
</script>

<template>
  <div :class="$style.container">
    <div
      :class="{
        [$style.status]: true,
        [$style.statusError]: isError
      }"
    >
      {{ computedStatus }}
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  justify-content: flex-end;
}

.status {
  display: flex;
  align-items: center;
  height: rem(24px);
  padding: rem(0 10px);
  line-height: 1;
  background: #F2EFEF;
  border-radius: rem(12px);
}

.statusError{
  color: #F00;
  background: #FBE6D1;
}

</style>
