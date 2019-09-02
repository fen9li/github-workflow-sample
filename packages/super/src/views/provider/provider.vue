<script>
import providerMock from '@tests/__fixtures__/provider'
import ProviderDetails from './details/provider-details'
import ProviderEdit from './edit/provider-edit'

export default {
  name: 'Provider',
  components: {
    ProviderDetails,
    ProviderEdit,
  },
  data() {
    return {
      loading: false,
      provider: {
        ...providerMock
      },
      isEdit: this.$route.params.edit || this.$route.meta.create,
    }
  },
  computed: {
    providerId() {
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return undefined
    },
    isCreate() {
      return this.$route.meta.create
    },
    back() {
      if (this.isEdit) {
        if (this.isCreate) {
          return {
            name: 'providers',
          }
        } else {
          return {
            name: 'provider-details',
            params: {
              id: this.providerId,
              edit: null,
            },
          }
        }
      } else {
        return {
          name: 'providers',
        }
      }
    },
    title() {
      if (this.isEdit) {
        return this.isCreate ? 'Create Provider' : 'Edit Provider'
      }
      return this.provider.name
    }
  },
  watch: {
    '$route'(route) {
      if (!route.params.edit) {
        this.isEdit = false
      }
    },
  },
  methods: {
    onEdit() {
      this.isEdit = true
      this.$router.push({
        name: 'provider-details',
        params: { edit: 'edit' },
      })
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :back="back"
    :loading="loading"
  >
    <provider-edit
      v-if="isEdit"
      :provider="provider"
      :create="isCreate"
    />
    <provider-details
      v-else
      :provider="provider"
      @click="onEdit"
    />
  </main-layout>
</template>
