<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main/main-layout.vue'

export default {
  name: 'SubscriptionNew',
  page: {
    title: 'Subscriptions',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
  },
  data() {
    return {
      form: {
        customerName: 'Mary Gregov',
        subscriptions: [''],
      },
      customers: [
        {
          name: 'Mary Gregov',
          email: 'marygregov@email.com',
          address: 'Candy Land, Camberwell 3120',
          phone: '0400 276 736',
        },
        {
          name: 'Martin Smit',
          email: 'martinsmit@email.com',
          address: 'Greentown, Flower Street 513',
          phone: '0400 765 254',
        },
        {
          name: 'Nicola Tesla',
          email: 'nicolatesla@email.com',
          address: 'Sidney, Kingstown 2517',
          phone: '0400 312 228',
        },
      ],
      products: [
        {
          value: 'Toys',
          label: 'Toys',
        },
        {
          value: 'Travel',
          label: 'Travel',
        },
        {
          value: 'Electronics',
          label: 'Electronics',
        },
        {
          value: 'Sale',
          label: 'Sale',
        },
      ],
    }
  },
  computed: {
    isDataEmpty() {
      return Array.isArray(this.customers) && this.customers.length === 0
    },
    isSelectedCustomer() {
      if (!this.isDataEmpty) {
        return this.customers.filter(
          customer => customer.name === this.form.customerName
        )[0]
      }
      return {}
    },
    subscriptions() {
      return this.form.subscriptions.slice(1)
    },
  },
  methods: {
    addSubscription() {
      this.form.subscriptions.unshift('')
    },
    onSubscription() {
      // console.log('submit');
    },
  },
}
</script>

<template>
  <layout>
    <router-link to="/billing/subscriptions">
      <el-button type="text">
        Back to Subscriptions List
      </el-button>
    </router-link>

    <hr>

    <h4>Customer</h4>
    <el-form
      ref="form"
      :model="form"
      class="subscription-new"
    >
      <el-row type="flex">
        <el-col
          :span="6"
          class="subscription-new__search"
        >
          <el-form-item label="Search by Customer Name*">
            <el-select
              v-model="form.customerName"
              filterable
              placeholder="Search by Customer Name"
            >
              <el-option
                v-for="item in customers"
                :key="item.phone"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="6">
          <el-card class="subscription-new__choosen">
            <el-row class="subscription-new__choosen-row">
              <el-col :span="7">
                Send to
              </el-col>
              <el-col :span="17">
                {{ isSelectedCustomer.email }}
              </el-col>
            </el-row>
            <el-row class="subscription-new__choosen-row">
              <el-col :span="7">
                Address
              </el-col>
              <el-col :span="17">
                {{ isSelectedCustomer.address }}
              </el-col>
            </el-row>
            <el-row class="subscription-new__choosen-row">
              <el-col :span="7">
                Phone
              </el-col>
              <el-col :span="17">
                {{ isSelectedCustomer.phone }}
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <hr>
      <h4>Products</h4>
      <el-row
        type="flex"
        align="bottom"
      >
        <el-col :span="6">
          <el-form-item label="Subscriptions*">
            <el-select
              v-model="form.subscriptions[0]"
              filterable
              allow-create
              placeholder="Product name"
            >
              <el-option
                v-for="item in products"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="1"
          :offset="1"
        >
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            class="subscription-new__add"
            @click="addSubscription"
          />
        </el-col>
      </el-row>
      <div v-if="subscriptions">
        <el-row
          v-for="subscription in subscriptions"
          :key="subscription"
          class="subscription-new__item"
        >
          <el-col :span="6">
            <p>{{ subscription }}</p>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex">
        <el-col
          :span="6"
          :offset="17"
        >
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubscription"
            >
              Start Subscription
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </layout>
</template>

<style lang="scss">
@import '@design';

.subscription-new {
  .el-form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__content {
      width: 100%;
    }

    .el-select {
      position: relative;
      width: 100%;
    }

    &__label {
      text-align: left;
    }
  }
  &__last {
    text-align: right;
  }

  &__choosen {
    margin-bottom: 50px;
    background-color: #f6f6f6;
    border-radius: 7px;

    &-row {
      padding: 5px 0;
    }
  }

  &__add {
    margin-bottom: 22px;
  }
}
</style>
