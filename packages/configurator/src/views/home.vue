<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters('exchange', [
      'waiting',
      'connecting',
      'connected',
      'url',
      'ready',
    ]),
  },
  watch: {
    ready(ready) {
      if (ready) {
        this.$router.push({
          name: 'index',
        })
      }
    },
  },
  created() {
    if (this.ready) {
      this.$router.push({ name: 'index' })
    }
  },
}
</script>

<template>
  <div :class="$style.root">
    <h1 :class="$style.title">
      Debi Configuration Tool
    </h1>
    <div :class="$style.status">
      <div :class="$style.statusHead">
        <span v-if="waiting">Waiting for application...</span>
        <span v-if="connecting">Connecting to:</span>
        <span v-if="connected">Connected to:</span>
      </div>
      <div
        v-if="connecting || connected"
        :class="$style.statusUrl"
      >
        {{ url }}
      </div>
      <div :class="$style.statusTip">
        <span v-if="connected">
          Waiting for application readiness...
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  text-align: center;
}

.title {
  margin-bottom: rem(40px);
  font-size: rem(20px);
  font-weight: 400;
}

.statusUrl {
  margin: rem(10px 0);
  color: var(--color-primary);
}

.statusHead,
.statusTip {
  font-weight: 300;
}
</style>
