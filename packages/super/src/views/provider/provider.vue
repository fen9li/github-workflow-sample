<script>
import { mapActions } from 'vuex'
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
      isEdit: this.$route.params.edit || this.$route.meta.create,
      loading: !this.$route.meta.create,
      provider: {},
      progress: false,
    }
  },
  computed: {
    providerId() {
      return this.$route.params.id || null
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
  async created() {
    if (this.providerId) {
      const [, response] = await this.getProvider({ id: this.providerId })
      if (response) {
        this.provider = response
      }
    }
  },
  methods: {
    ...mapActions('provider', [
      'getProvider',
      'createProvider',
      'updateProvider',
    ]),
    onEdit() {
      this.isEdit = true
      this.$router.push({
        name: 'provider-details',
        params: { edit: 'edit' },
      })
    },
    async onSubmit(form) {
      this.progress = true
      const action = this.providerId ? 'updateProvider' : 'createProvider'
      const [error, response] = await this[action](form)
      if (error) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message: error.message,
        })
      }
      if (response) {
        this.isEdit = false
        this.provider = response
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Successfuly ${this.isCreate ? 'created' : 'updated'}`,
        })
      }
      this.progress = false
    },
    onCancel() {
      this.$router.push(this.back)
    }
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
      :progress="progress"
      @submit="onSubmit"
      @cancel="onCancel"
    />
    <provider-details
      v-else
      :provider="provider"
      @click="onEdit"
    />
  </main-layout>
</template>
