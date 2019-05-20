<script>
import merchantDetails from '../merchant/details/merchant-details'
import originalMerchantDetails from '@tests/__fixtures__/merchant-details.js'
import updatedMerchantDetails from '@tests/__fixtures__/merchant-updated.js'


export default {
  name: 'MerchantUpdated',
  components: {
    merchantDetails,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      originalMerchantDetails,
      updatedMerchantDetails,
    }
  },
  methods: {
    submit() {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Merchant Update"
      :class="$style.modal"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div :class="$style.blocks">
        <merchant-details
          original
          :details="originalMerchantDetails"
          :details-page="false"
          :class="[$style.block, $style.blockDivider]"
        />
        <merchant-details
          :details-page="false"
          :details="updatedMerchantDetails"
          :class="$style.block"
        />
      </div>
      <div :class="$style.controls">
        <el-button
          type="danger"
          class="wide-button"
        >
          Disregard
        </el-button>
        <el-button
          type="primary"
          :class="['wide-button', $style.editBtn]"
        >
          Review and Edit
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.modal {
  :global {
    .el-dialog {
      width: 90% !important;
      max-width: 90% !important;
    }
  }
}

.blocks {
  display: flex;
  justify-content: space-between;
}

.block {
  flex-basis: 50%;

  &:nth-child(1) {
    @media screen and (min-width: 1440px) {
      margin-right: 1.5rem
    }
  }

  &:nth-child(2) {
    margin-left: 1.5rem;
  }
}

.blockDivider {
  background-image: linear-gradient(var(--color-primary) 50%, transparent 0%);
  background-repeat: repeat-y;
  background-position: right;
  background-size: .1rem 1rem;
}

.controls {
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
}

.editBtn {
  margin-left: 2rem !important;
}
</style>
