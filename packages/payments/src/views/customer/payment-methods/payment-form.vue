<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'NewPaymentMethodForm',
  directives: {
    mask,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tab: 'card',
      rules: {},
    }
  },
  methods: {
    changeValue(fieldName, type, newVal) {
      this.$emit('changeValue', { fieldName, type, newVal })
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-tabs
      v-model="tab"
      stretch
    >
      <el-tab-pane
        label="Credit/Debit Card"
        name="card"
      >
        <el-form
          :model="form.card"
          :rules="rules"
        >
          <el-form-item
            label="Card Holder Name"
            required
          >
            <el-input
              :value="form.card.name"
              @input="changeValue('name', 'card', $event)"
            />
          </el-form-item>

          <el-form-item
            label="Card No"
            required
          >
            <el-input
              :value="form.card.number"
              @input="changeValue('number', 'card', $event)"
            />
          </el-form-item>

          <el-form-item
            label="Expiry"
            required
          >
            <el-input
              v-mask="['##/##']"
              :value="form.card.expiry"
              :class="$style.short"
              @input="changeValue('expiry', 'card', $event)"
            />
          </el-form-item>

          <el-form-item
            label="CVV"
            required
          >
            <el-input
              v-mask="['###']"
              :value="form.card.cvv"
              :class="$style.short"
              @input="changeValue('cvv', 'card', $event)"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        label="Bank Account"
        name="account"
      >
        <el-form
          :model="form.account"
          :rules="rules"
        >
          <el-form-item
            label="Account Name"
            required
          >
            <el-input
              :value="form.account.name"
              @input="changeValue('name', 'account', $event)"
            />
          </el-form-item>

          <el-form-item
            label="BSB"
            required
          >
            <el-input
              :value="form.account.bsb"
              @input="changeValue('bsb', 'account', $event)"
            />
          </el-form-item>

          <el-form-item
            label="Account No"
            required
          >
            <el-input
              :value="form.account.number"
              :class="$style.short"
              @input="changeValue('number', 'account', $event)"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      :class="$style.saveButton"
      @click="$emit('save')"
    >
      Save
    </el-button>
  </div>
</template>

<style lang="scss" module>
.root {

  :global {
    .el-tabs__content {
      margin-top: 2.5rem;
    }
  }
}

.short {
  width: 55%;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
