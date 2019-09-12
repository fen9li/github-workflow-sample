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
    menu() {
      return [
        {
          title: 'Dashboard',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/dashboard',
        },
        {
          title: 'Modules',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/modules',
        },
        {
          title: 'Menu',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          path: '/menu'
        }
      ]
    }
  },
}
</script>

<template>
  <base-layout
    :class="$style.root"
    :back="false"
  >
    <img
      slot="header"
      :class="$style.logo"
      src="//loyaltycorp.com.au/wp-content/uploads/logo-lc.svg"
    >
    <div
      v-if="ready"
      :class="$style.index"
    >
      <base-menu-link
        v-for="item in menu"
        :key="item.title"
        :to="item.path"
        :title="item.title"
      >
        {{ item.description }}
      </base-menu-link>
    </div>
    <template v-else>
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
    </template>
  </base-layout>
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

.index {
  text-align: left;
}

.logo {
  max-width: rem(160px);
  height: 100%;
  margin: auto;
}
</style>
