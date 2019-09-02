<script>
import applications from '@lib/applications'
import { mapGetters } from 'vuex'

export default {
  inheritAttrs: false,
  computed: {
    ...mapGetters('auth', [
      'profile',
    ]),
    applications() {
      return applications
    },
  },
}
</script>

<template>
  <main-layout
    :title="`Welcome ${profile.given_name || 'Username'}`"
    subtitle="These are shortcuts to all your platform products."
  >
    <div :class="$style.main">
      <template v-for="(item, name) in applications">
        <el-col
          v-if="(!item.scope || $grant(item.scope)) && name !== 'super'"
          :key="item.path"
          :class="[$style.appsItem, 'grid-content']"
        >
          <a :href="item.path">
            <el-card shadow="hover">
              <div :class="$style.card">
                <img :src="`/images/${item.icon}`">
                <div :class="$style.cardLabel">{{ item.label }}</div>
                <div :class="$style.cardArrow">
                  <img src="/images/arrow-right.svg">
                </div>
              </div>
            </el-card>
          </a>
        </el-col>
      </template>
    </div>
  </main-layout>
</template>

<style lang="scss" module>
.main {
  padding: 0 38px;
}

.appsItem {
  width: 50%;
  padding: 10px;

  .card {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 32px;

    .cardLabel {
      margin-left: 40px;
      font-size: 30px;
    }

    .cardArrow {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }

  a {
    text-decoration: none;
  }

  small {
    opacity: .5;
  }

  :global(.el-card__body) {
    padding-top: 0;
  }
}
</style>
