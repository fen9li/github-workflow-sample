<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import { mapActions } from 'vuex'
import userMock from '@tests/__fixtures__/account'

export default {
  name: 'AccountInformationTab',
  components: {
    DataBox,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      account: {
        ...userMock
      },
      loading: true,
    }
  },
  computed: {
    status() {
      const { account } = this

      if (account) {
        return account.status
      }

      return ''
    },
  },
  created() {
    this.getData()
    this.activeTab = this.$route.params.tab || 'information'
  },
  methods: {
    ...mapActions('account', ['getAccount']),
    async getData(){
      const [, response] = await this.getAccount(this.id)
      if (response) {
        this.account = { ...response }
      }
      this.loading = false
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
  },
}
</script>

<template>
  <div>
    <data-box
      header="User Details"
      :status="status"
    >
      <dt>Date Created</dt>
      <dd>{{ formatDate(account.createdAt) }}</dd>

      <dt>Provider Name</dt>
      <dd>{{ account.provider || '—' }}</dd>

      <dt>External ID</dt>
      <dd>{{ account.externalId || '—' }}</dd>

      <dt>Account ID</dt>
      <dd>{{ account.id || '—' }}</dd>

      <dt>Provider ID</dt>
      <dd>{{ account.providerId || '—' }}</dd>

      <dt>Current Balance</dt>
      <dd>{{ account.balance.current || '—' }}</dd>

      <dt>Min Balance</dt>
      <dd>{{ account.balance.min || '—' }}</dd>

      <dt>Max Balance</dt>
      <dd>{{ account.balance.max || '—' }}</dd>

      <dt>Life1me Points Earned</dt>
      <dd>{{ account.earned || '—' }}</dd>

      <dt>Membership</dt>
      <dd>{{ account.membership || '—' }}</dd>

      <dt>Last Updated</dt>
      <dd>{{ formatDate(account.updatedAt) }}</dd>

      <div slot="boxFooter">
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
  // width: rem(200px);
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
