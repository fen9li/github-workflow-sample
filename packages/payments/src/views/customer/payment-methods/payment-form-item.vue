<script>
import paymentForm from './payment-form'

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
  },
  data() {
    return {
      newMethodForm: {
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
    displayClose() {
      return this.paymentMethods.length > 0 && this.displayForm
    },
  },
  methods: {
    updateValue({ fieldName, type, newVal }) {
      this.newMethodForm[type][fieldName] = newVal
    },
    saveMethod() {
      this.$emit('showForm', false)
    },
  },

}
</script>

<template>
  <div>
    <el-form-item
      label="Payment Method"
      :class="$style.methodsElem"
      required
    >
      <div :class="$style.methods">
        <template v-if="!displayForm">
          <el-button
            type="text"
            :class="$style.newMethod"
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
              :value="method.value"
              :label="method.label"
            />
          </el-select>
        </template>
        <el-button
          v-if="displayClose"
          type="text"
          :class="$style.formClose"
          @click="$emit('showForm', false)"
        >
          <i class="el-icon-plus" />
        </el-button>
      </div>
    </el-form-item>

    <payment-form
      v-if="displayForm"
      :form="newMethodForm"
      @changeValue="updateValue"
      @save="saveMethod"
    />
  </div>
</template>

<style lang="scss" module>


.methodsElem {
  margin-top: 0.5rem;
}

.methods {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.newMethod {
  margin: 0 0 .5rem auto;
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
