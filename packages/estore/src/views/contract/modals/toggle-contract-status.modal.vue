<script>
import { mapActions } from 'vuex'
import ClosableText from '~/components/closable-text'

export default {
  name: 'ToggleContractStatusModal',
  components: {
    ClosableText,
  },
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  data() {
    const { active } = this.contract

    return {
      progress: false,
      initialValue: active,
      isActive: active,
    }
  },
  methods: {
    ...mapActions('contract', ['toggleContractStatus']),
    async onSubmit() {
      const { initialValue, isActive } = this

      if (initialValue !== isActive) {
        this.progress = true
        await this.toggleContractStatus(this.contract.id)
      }

      this.$emit('success')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    title="Update Contract Status"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form :class="$style.form">
      <el-form-item>
        <el-switch
          v-model="isActive"
          :active-text="isActive ? 'Contract Active' : 'Contract Not Active'"
        />
      </el-form-item>
    </el-form>

    <closable-text
      v-if="initialValue && !isActive"
      :class="$style.closableText"
      icon="info"
    >
      Changing the Status to Not Active will automatically make any Provider
      Products associated with the Contract Unavailable.
    </closable-text>
    <closable-text
      v-else-if="!initialValue && isActive"
      :class="$style.closableText"
      icon="info"
    >
      Changing the Status to Active will automatically publish or re-publish all
      Provider Products associated with the Contract.
    </closable-text>

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
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.form :global(.el-form-item__content) {
  justify-content: center;
}

.closableText {
  width: 80%;
  margin-right: auto;
  margin-bottom: 2rem;
  margin-left: auto;
}
</style>
