<script>
import paymentForm from './payment-form'
import capitalize from 'lodash/capitalize'

export default {
  name: 'AddPaymentMethodFormItem',
  components: {
    paymentForm,
  },
  props: {
    paymentMethods: {
      type: Array,
      default: () => [],
    },
    selectedMethod: {
      type: [String, Number],
      default: () => null,
    },
    displayForm: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Payment Method',
    },
  },
  data() {
    return {
      form: {
        account: {
          name: '',
          bsb: '',
          number: '',
        },
        card: {
          name: '',
          number: '',
          expiry: '',
          cvv: '',
        },
      },

    }
  },
  computed: {
    showCloseIcon() {
      return this.paymentMethods.length && this.displayForm
    },
  },
  methods: {
    updateValue({ fieldName, type, newVal }) {
      this.form[type][fieldName] = newVal
    },
    saveMethod() {
      // TODO: Add api method call when new method should be added, then emit close event
      this.$emit('showForm', false)
    },
    formatMethod(method) {
      return `${method.name} **** ${method.pan.toString().slice(-4)} ${capitalize(method.type.replace('_', ' '))}`
    }
  },
}
</script>

<template>
  <div>
    <el-form-item
      :label="label"
      :class="$style.methodsElem"
      required
    >
      <div :class="$style.methods">
        <template v-if="!displayForm">
          <el-button
            type="text"
            :class="$style.newMethod"
            data-test="add"
            @click="$emit('showForm', true)"
          >
            <i class="el-icon-plus" />
            Add New Payment Method
          </el-button>
          <el-select
            :value="selectedMethod"
            @change="$emit('changeMethod', $event)"
          >
            <el-option
              v-for="(method, index) in paymentMethods"
              :key="index"
              :value="method.token"
              :label="formatMethod(method)"
            />
          </el-select>
        </template>
        <el-button
          v-if="showCloseIcon"
          type="text"
          :class="$style.formClose"
          data-test="close"
          @click="$emit('showForm', false)"
        >
          <i class="el-icon-plus" />
        </el-button>
      </div>
    </el-form-item>

    <payment-form
      v-if="displayForm"
      :form="form"
      @changeValue="updateValue"
      @save="saveMethod"
    />
  </div>
</template>

<style lang="scss" module>
.methodsElem {
  position: relative;
  margin-top: 0.5rem;
}

.methods {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.newMethod {
  position: absolute;
  right: 0;
  bottom: 100%;
  padding-bottom: 0.4rem;
  transition: none;
}

.formClose {
  width: 2rem;
  padding: 0;
  margin-left: auto;
  font-size: 1.5rem;
  font-weight: 700;
  transition: none;
  transform: rotate(45deg);
}
</style>
