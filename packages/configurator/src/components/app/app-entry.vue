<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'AppEntry',
  computed: {
    ...mapGetters('exchange', [
      'url',
      'connecting',
      'error',
    ]),
    disabled() {
      return !this.url || this.connecting
    },
  },
  methods: {
    ...mapMutations('exchange', {
      setUrl: 'SET_URL',
    }),
    ...mapActions('exchange', {
      connectToFrame: 'CONNECT_TO_FRAME',
    }),
  },
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.wrapper">
      <div :class="$style.label">
        Enter application URL:
      </div>
      <el-input
        :value="url"
        :class="$style.input"
        :disabled="connecting"
        placeholder="Enter application URL"
        @input="setUrl"
      >
        <template slot="prepend">
          https://
        </template>
      </el-input>
      <div :class="$style.error">
        {{ error }}
      </div>
    </div>
    <el-button
      type="primary"
      :class="$style.button"
      :disabled="disabled"
      @click="connectToFrame()"
    >
      Load App
    </el-button>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.wrapper {
  margin-bottom: rem(20px);
}

.label,
.error {
  font-size: rem(14px);
}

.error {
  color: var(--color-error);
}

.input {
  width: rem(400px);
  margin: rem(8px 0);
}

.button {
  width: rem(200px);
}
</style>
