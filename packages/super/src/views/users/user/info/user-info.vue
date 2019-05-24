<script>

export default {
  name: 'UserInfo',
  page: {
    title: 'User Information',
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
  <el-card>
    <dl
      class="datalist"
      style="color: #8f8f8f "
    >
      <dt>Name</dt>
      <dd>{{ userData.name }}</dd>
      <dt>Nick</dt>
      <dd>{{ userData.nickname }}</dd>
      <dt>Email</dt>
      <dd>{{ userData.email }}</dd>
      <dt>Email verified</dt>
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
</template>

<style lang="scss" module>
</style>
