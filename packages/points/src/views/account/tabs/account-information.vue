<script>
import get from 'lodash/get'
import { mapGetters } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'

export default {
  name: 'AccountInformationTab',
  components: {
    DataBox,
    DataList,
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters('providers', [
      'getProviderName',
    ]),
    badges() {
      return get(this.account, 'badges', null)
    },
    status() {
      const { account } = this

      if (account) {
        return account.status
      }

      return ''
    },
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm A')
    },
  },
}
</script>

<template>
  <div>
    <data-box
      v-if="!loading"
      header="User Details"
      :status="status"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(account.createdAt) }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ getProviderName(account.providerId) || '—' }}</dd>

        <dt>External ID</dt>
        <dd>{{ account.externalId || '—' }}</dd>

        <dt>Account ID</dt>
        <dd>{{ account.id || '—' }}</dd>

        <dt>Provider ID</dt>
        <dd>{{ account.providerId || '—' }}</dd>

        <dt>Current Balance</dt>
        <dd>{{ account.balance }}</dd>

        <dt>Min Balance</dt>
        <dd>{{ account.minBalance }}</dd>

        <dt>Max Balance</dt>
        <dd>{{ account.maxBalance }}</dd>

        <dt>Lifetime Points Earned</dt>
        <dd>{{ account.lifetimeBalance || '—' }}</dd>

        <dt>Membership</dt>
        <dd>{{ account.membership || '—' }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(account.updatedAt) }}</dd>
      </data-list>

      <div
        v-if="badges.length"
      >
        <hr :class="['divider-primary', 'info-block__divider']">
        <div :class="$style.title">
          Badges
        </div>

        <ul :class="$style.badges">
          <li
            v-for="(badge, index) in account.badges"
            :key="index"
            :class="$style.badge"
          >
            <div
              :class="$style.logo"
              :style="{backgroundImage: `url(${badge.logo})`}"
            />
            <dl :class="$style.list">
              <dt :class="$style.key">
                Name
              </dt>
              <dd :class="$style.value">
                <b>{{ badge.name }}</b>
              </dd>
              <dt :class="$style.key">
                Attained
              </dt>
              <dd :class="$style.value">
                {{ badge.attained }}
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </data-box>
  </div>
</template>

<style lang="scss" module>
.title {
  padding: 0 0 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.badges {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}

.logo {
  width: rem(80px);
  height: rem(80px);
  padding: 0;
  margin: rem(0 0 20px);
  background-color: #e4e2e2;
}

.badge {
  padding: 0;
  margin: rem(0 20px 80px 0);
}

.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}

.key {
  flex-basis: rem(80px);
  flex-grow: 0;
  padding: rem(0 0 10px);
  margin: 0;
}

.value {
  padding: rem(0 0 10px);
  margin: 0;
}

</style>
