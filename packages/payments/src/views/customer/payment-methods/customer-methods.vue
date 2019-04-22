<script>
import AddModal from './payment-method-add'
import DeleteModal from './payment-method-delete'
import MockData from '@mock-api/customer'

export default {
  name: 'CustomerPaymentMethods',
  components: {
    AddModal,
    DeleteModal,
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
      return MockData.methods
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
  <el-card>
    <el-row
      slot="header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <span>Payment Methods</span>

      <el-row type="flex">
        <el-button
          class="wide-button"
          type="primary"
          size="small"
          @click="modal.add = true"
        >
          Add
        </el-button>
      </el-row>
    </el-row>

    <div :class="$style.cards">
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
          {{ method.firstName }} {{ method.lastName }}
        </div>
        <div v-if="method.bsb">
          BSB {{ method.bsb }}
        </div>
        <div
          v-else
          :class="$style.cardNumber"
        >
          {{ method.cardNumber }}
        </div>
        <div
          v-if="method.expiry"
          :class="$style.cardExpiry"
        >
          {{ method.expiry }}
        </div>
        <div v-else>
          ACC {{ method.accountNumber }}
        </div>
        <el-button
          type="danger"
          :class="$style.cardDelete"
          icon="el-icon-delete"
          size="small"
          circle
          @click="deleteCard(method)"
        />
      </div>
    </div>
    <add-modal :visible.sync="modal.add" />
    <delete-modal
      v-if="methodToRemove"
      :visible="true"
      :method="methodToRemove"
      @close="methodToRemove = null"
    />
  </el-card>
</template>

<style lang="scss" module>


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
