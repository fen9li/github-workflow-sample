<script>
import { mapState, mapActions } from 'vuex'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'CreateAccount',
  props: {
    accountProcessor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      form: {
        provider: null,
        externalId: null,
      },
      rules: {
        provider: {
          required: true,
          message: 'Provider name is required',
        },
        externalId: {
          required: true,
          message: 'External ID is required',
        },
      },
      loaded: false,
      progress: false,
      showModal: false,
    }
  },
  computed: {
    ...mapState('providers', ['providers']),
  },
  methods: {
    ...mapActions('account', ['createAccount']),
    ...mapActions('providers', ['getProviders']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)
      if (!formValid) {
        return
      }
      this.progress = true
      await this.createAccount(this.form)
      await this.accountProcessor.getData()
      this.progress = false
      this.showModal = false
      this.$notify({
        type: 'success',
        title: 'Account created',
        message: `Account ${this.form.externalId} successfully created`,
      })
    },
    onShowModalClick() {
      this.loaded = false
      this.showModal = true
      this.getProviders().then(() => {
        this.loaded = true
      })
    },
  }
}
</script>

<template>
  <div ref="createAccount">
    <el-button
      type="primary"
      @click="onShowModalClick"
    >
      Create Account
    </el-button>
    <el-dialog
      :visible.sync="showModal"
      title="Create Account"
      modal-append-to-body
      append-to-body
    >
      <div
        v-if="!loaded"
        v-loading="true"
        class="modal-loader"
      />

      <el-form
        v-else
        ref="form"
        :model="form"
        label-position="top"
      >
        <el-form-item
          label="Provider Name"
          prop="provider"
          required
        >
          <el-select v-model="form.provider">
            <el-option
              v-for="(item, index) in providers"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="External ID"
          prop="externalId"
          required
        >
          <el-input
            v-model="form.externalId"
          />
        </el-form-item>
        <el-button
          type="primary"
          :class="$style.button"
          :loading="progress"
          :disabled="progress"
          class="el-button--wide"
          @click.stop="onSubmit"
        >
          Save
        </el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:global {
  .el-input__count-inner {
    line-height: 1;
  }
}
</style>
