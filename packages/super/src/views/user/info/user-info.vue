<script>
// import appConfig from '~/app.config'

export default {
  name: 'UserInfo',
  page: {
    title: 'User Information',
    // meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    }
  },
  computed: {
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-card>
      <div
        slot="header"
        :class="$style.caption"
      >
        <el-image
          style="width: 3rem; height: 3rem; border-radius: 50%"
          :src="userData.picture"
        />
        <h1 :class="$style.userName">
          {{ userData.nickname }}
        </h1>
      </div>
      <dl
        class="datalist"
        style="color: #8f8f8f "
      >
        <dt>Name</dt>
        <dd>{{ userData.name }}</dd>
        <dt>Nick</dt>
        <dd>{{ userData.nickname }}</dd>
        <dt>EMAIL</dt>
        <dd>{{ userData.email }}</dd>
        <dt>EMAIL verified</dt>
        <dd>{{ userData.email_verified }}</dd>
        <dt>Date Created</dt>
        <dd>{{ userData.created_at | dateTime }}</dd>
        <dt>Logins count</dt>
        <dd>{{ userData.logins_count }}</dd>
        <dt>Date of last login</dt>
        <dd>{{ userData.last_login | dateTime }}</dd>
        <dt>Last IP</dt>
        <dd>{{ userData.last_ip }}</dd>
      </dl>
    </el-card>
  </div>
</template>

<style lang="scss" module>
  .caption {
    display: flex;
    flex-direction: row;
    align-items: center;
    .userName {
      padding-left: 1rem;
      font-size: 1.2rem;
      font-weight: var(--heading-font-weight);
      text-transform: uppercase;
    }
  }
</style>
