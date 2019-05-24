<script>

export default {
  name: 'EndpointInfo',
  page: {
    title: 'API endpoint Information',
  },
  components: {
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    endpointData: {
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
      <dt>ID</dt>
      <dd>{{ endpointData.id }}</dd>
      <dt>Name</dt>
      <dd>{{ endpointData.name }}</dd>
      <dt>Identifier</dt>
      <dd>{{ endpointData.identifier }}</dd>
      <dt>Allow offline access</dt>
      <dd>{{ endpointData.allow_offline_access }}</dd>
      <dt>Skip consent</dt>
      <dd>{{ endpointData.skip_consent_for_verifiable_first_party_clients }}</dd>
      <dt>Token lifetime</dt>
      <dd>{{ endpointData.token_lifetime }}</dd>
      <dt>Token lifetime Web</dt>
      <dd>{{ endpointData.token_lifetime_for_web }}</dd>
      <dt>Signing alg</dt>
      <dd>{{ endpointData.signing_alg }}</dd>
    </dl>
  </el-card>
</template>

<style lang="scss" module>
</style>
