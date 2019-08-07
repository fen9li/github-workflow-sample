<script>
import AddModal from './payment-method-add'
import DeleteModal from './payment-method-delete'

export default {
  name: 'CustomerPaymentMethods',
  components: {
    AddModal,
    DeleteModal,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    customer: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      methodToRemove: null,
      modal: {
        add: false,
      },
    }
  },
  computed: {
    methods() {
      return this.customer.payment_sources || []
    },
  },
  methods: {
    getCardLogo(method) {
      return '/img/visa_logo.png'
    },
    deleteCard(method) {
      this.methodToRemove = method
    },
  },
}
</script>

<template>
  <div class="info-block">
    <div :class="$style.header">
      <span class="info-block__title">
        Payment Methods
      </span>

      <el-button
        class="wide-button"
        type="primary"
        size="small"
        data-test="add"
        @click="modal.add = true"
      >
        Add
      </el-button>
    </div>

    <div
      v-if="methods.length"
      :class="$style.cards"
    >
      <!-- TODO: Adjust to updated format (after backend adds data) -->
      <div
        v-for="(method, idx) in methods"
        :key="idx"
        shadow="never"
        :class="$style.card"
      >
        <div :class="$style.cardLogo">
          <img
            :class="$style.cardLogoImage"
            :src="getCardLogo(method)"
          >
        </div>
        <div :class="$style.cardHolder">
          {{ method.name }}
        </div>
        <div v-if="method.bsb">
          BSB {{ method.bsb }}
        </div>
        <div
          v-else
          :class="$style.cardNumber"
        >
          {{ method.pan }}
        </div>
        <div
          v-if="method.expiry"
          :class="$style.cardExpiry"
        >
          {{ method.expiry }}
        </div>
        <div v-if="method.acc">
          ACC {{ method.accountNumber }}
        </div>
        <el-button
          type="danger"
          :class="$style.cardDelete"
          icon="el-icon-delete"
          size="small"
          circle
          data-test="delete"
          @click="deleteCard(method)"
        />
      </div>
    </div>

    <span v-else>
      No payment methods
    </span>
    <add-modal
      v-if="modal.add"
      :visible.sync="modal.add"
      :customer="customer"
    />
    <delete-modal
      v-if="methodToRemove"
      :visible="true"
      :method="methodToRemove"
      @close="methodToRemove = null"
    />
  </div>
</template>

<style lang="scss" module>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
  margin-bottom: 1rem;
}

.card {
  position: relative;
  width: 16rem;
  padding-bottom: 1.5rem;
  padding-left: 2rem;
  margin: 1rem;
  background: rgba(0,0,0,.05);
  border-radius: .6rem;
}

.cardLogo {
  height: 2rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.cardLogoImage {
  width: 3rem;
  margin-left: auto;
}

.cardNumber {
  font-size: 1.3rem;
}

.cardHolder {
  margin-bottom: .4rem;
  font-weight: bold;
}

.cardExpiry {
  font-size: .8rem;
  font-weight: bold;
}

.cardDelete {
  position: absolute;
  right: 1rem;
  bottom: -1rem;
}
</style>
