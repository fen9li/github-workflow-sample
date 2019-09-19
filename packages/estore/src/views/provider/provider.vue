<script>
export default {
  name: 'ProviderDetails',
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div>
    {{ `Provider details with ID ${id}` }}
  </div>
</template>
