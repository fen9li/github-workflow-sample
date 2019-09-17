<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderPublish',
  data() {
    return {
      showModal: false,
      isSuccessMessage: false,
    }
  },
  methods: {
    ...mapActions('catalogues', [
      'publishCatalogues',
    ]),
    async publishChanges() {
      this.showModal = false

      const [error] = await this.publishCatalogues()
      if(error) {
        if(error.violations) {
          const violations = Object.keys(error.violations)
          violations.forEach(violation => {
            setTimeout(() => {
              this.$notify({
                type: 'error',
                title: `Unable to publish changes`,
                message: `${violation}: ${error.violations[violation][0]}`,
              })
            }, 50)
          })
        } else {
          this.$notify({
            type: 'error',
            title: `Unable to publish changes`,
            message: error.message,
          })
        }
      } else {
        this.showSavedMessage()
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Changes published successfully`,
        })
      }
    },
    async showSavedMessage() {
      this.isSuccessMessage = true
      await new Promise(resolve => setTimeout(resolve, 10000))
      this.isSuccessMessage = false
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <div
      :class="[
        $style.message,
        isSuccessMessage && $style.messageShow,
      ]"
    >
      <el-icon
        name="success"
        :class="$style.messageIcon"
      />
      Saved
    </div>
    <el-button
      type="success"
      @click="showModal = true"
    >
      Publish
    </el-button>
    <el-dialog
      title="Publish Changes"
      :visible.sync="showModal"
      :class="$style.dialog"
    >
      <div :class="$style.dialogBody">
        <div :class="$style.dialogText">
          Are you sure you wish to publish the changes?
        </div>
        <el-button
          type="success"
          :class="[
            'el-button--wide',
            $style.dialogButton,
          ]"
          @click="publishChanges"
        >
          Publish
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  margin-right: rem(32px);
}

.message {
  display: flex;
  margin-right: rem(16px);
  color: #67C23A;
  opacity: 0;
  transition: opacity .5s;
  will-change: opacity;
}

.messageShow {
  opacity: 1;
}

.messageIcon {
  margin-right: rem(4px);
  font-size: 1.2em;
}

.dialog {
  :global {
    .el-dialog__header {
      padding-right: rem(40px);
      padding-left: rem(40px);
      text-align: left;
    }

    .el-form-item__content {
      min-height: unset;
    }
  }
}

.dialogBody {
  margin-top: rem(-24px);
}

.dialogText {
  margin-bottom: rem(16px);
}

.dialogButton {
  display: block !important;
  margin: auto !important;
}
</style>
