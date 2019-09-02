<script>
export default {
  name: 'ProviderList',
  props: {
    provider: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<template>
  <div>
    <dl :class="['datalist', $style.list]">
      <dt>Date Created</dt>
      <dd>{{ provider.createdAt }}</dd>

      <dt>Last Update Date</dt>
      <dd>{{ provider.updatedAt }}</dd>

      <dt>Provider ID</dt>
      <dd>{{ provider.id }}</dd>

      <dt>Provider name</dt>
      <dd>{{ provider.name }}</dd>

      <dt>Provider description</dt>
      <dd>{{ provider.description }}</dd>

      <dt>2FA</dt>
      <dd>{{ provider['2fa'] }}</dd>

      <dt>Timezone</dt>
      <dd>{{ provider.timezone }}</dd>
    </dl>
  </div>
</template>

<style lang="scss" module>
.list {
  flex: 1 0 50%;
  margin-top: 0;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}

.divider {
  margin: rem(40px 0);
}
</style>
