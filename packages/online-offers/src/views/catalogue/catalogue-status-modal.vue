<script>
import { mapActions } from 'vuex'

export default {
  name: 'StatusCatalogueModal',
  props: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      processing: false,
    }
  },
  methods: {
    ...mapActions('catalogues', [
      'updateCatalogue',
    ]),
    onDisable() {
      const { status,id } = this
      this.processing = true

      this.updateCatalogue({ enabled: !status , id }).then(response => {
        this.processing = false
        const [error,] = response
        if(error) {
          if(error.violations) {
            const violations = Object.keys(error.violations)
            violations.forEach(violation => {
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  title: `Unable to ${status ? 'disable' : 'enable'} client`,
                  message: `${violation}: ${error.violations[violation][0]}`,
                })
              }, 50)
            })
          } else {
            this.$notify({
              type: 'error',
              title: `Unable to ${status ? 'disable' : 'enable'} client`,
              message: error.message,
            })
          }
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Client successfully ${status ? 'disabled' : 'enabled'}`,
          })
        }
        this.$emit('catalogues-updated')
        this.$emit('update:visible', false)
      })
    }
  }
}
</script>

<template>
  <el-dialog
    :title="status ? 'Disable Client': 'Enable Client'"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div :class="$style.text">
      {{ `Are you sure you wish to ${status ?'disable' : 'enable'} this client?` }}
    </div>
    <div class="modal__footer">
      <el-button
        :type="status ? 'danger' : 'success'"
        class="el-button--wide"
        :loading="processing"
        @click="onDisable"
      >
        {{ status ? 'Disable Client': 'Enable Client' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 20rem;
}

.text {
  padding: 0 1rem;
  text-align: center;
  word-break: normal;
}
</style>
