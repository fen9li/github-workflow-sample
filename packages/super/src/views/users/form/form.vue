<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'UserForm',
  directives: {
    mask,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      data: {
      },
      products: [
        {
          value: 'payments',
          name: 'Payments',
        },
        {
          value: 'recroom',
          name: 'Rec Room',
        },
        {
          value: 'rewards',
          name: 'Rewards',
        },
        {
          value: 'points',
          name: 'Points',
        },
      ],
      select1: [],
      select2: [],
      rules: {
        givenName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        familyName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        provider: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        products: [
          {
            message: 'This field is required',
            // trigger: 'blur',
          },
        ],
      }
    }
  },
  mounted () {
    this.data = { ...this.data, ...this.user }
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    onSave() {},
  },
}
</script>

<template>
  <main-layout
    :title="user ? 'Edit User' : 'Create User'"
    back
  >
    <el-card>
      <div class="info-block__wrapper">
        <div class="info-block">
          <span
            class="info-block__title"
          >
            User Details
          </span>
        </div>
      </div>

      <el-form
        class="modal-form"
        label-position="top"
        :rules="rules"
        :class="$style.form"
      >
        <div class="united-field">
          <el-form-item
            label="First Name"
            prop="givenName"
          >
            <el-input
              v-model="data.givenName"
              data-test="givenName"
            />
          </el-form-item>
          <el-form-item
            label="Last Name"
            prop="familyName"
          >
            <el-input
              v-model="data.familyName"
              data-test="familyName"
            />
          </el-form-item>
        </div>
        <div class="united-field">
          <el-form-item
            label="Email Address"
            prop="email"
          >
            <el-input
              v-model="data.email"
              data-test="email"
            />
          </el-form-item>
          <el-form-item
            label="Telephone"
            prop="phone"
          >
            <el-input
              v-model="data.phone"
              v-mask="['#### ### ###']"
              placeholder="0400 000 000"
              data-test="phone"
            />
          </el-form-item>
        </div>
        <div class="united-field">
          <el-form-item
            label="Provider"
            prop="provider"
          >
            <el-input
              v-model="data.provider"
              data-test="provider"
            />
          </el-form-item>
          <el-form-item
            label="Status"
            prop="familyName"
          >
            <el-select
              v-model="data.status"
            >
              <el-option
                label="Active"
                value="active"
              />
              <el-option
                label="Pending"
                value="pending"
              />
              <el-option
                label="Blocked"
                value="blocked"
              />
            </el-select>
          </el-form-item>
        </div>
        <hr :class="['divider-primary', 'info-block__divider']">


        <el-form-item
          label="Products"
          prop="products"
        >
          <!-- <div>
            <el-checkbox-group
              v-model="data.products"
            >
              <el-checkbox
                v-for="(product, index) in products"
                :key="index"
                :label="product.name"
              />
            </el-checkbox-group>
          </div> -->

          <div :class="$style.products">
            <div
              v-for="(product, index) in products"
              :key="index"
              :class="$style.product"
            >
              <el-checkbox
                :label="product.name"
                :class="$style.productCheckbox"
              />
              <!-- TODO Versions -->
              <el-select
                v-model="select1"
                :class="$style.productSelect"
              >
                <el-option
                  label="Latest"
                  value="latest"
                />
                <el-option
                  label="V10"
                  value="10"
                />
              </el-select>
              <!-- TODO Roles -->
              <el-select
                v-model="select2"
                multiple
                collapse-tags
                placeholder="-"
                :class="$style.productSelect"
              >
                <el-option
                  label="Admin"
                  value="admin"
                />
                <el-option
                  label="Operator 1"
                  value="operator1"
                />
                <el-option
                  label="Operator2"
                  value="operator2"
                />
              </el-select>
            </div>
          </div>
        </el-form-item>
        <div>
          <el-button
            type="primary"
            plain
            :class="$style.button"
            @click="onCancel"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            :class="$style.button"
            @click="onSave"
          >
            Save
          </el-button>
        </div>
      </el-form>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.form {
  margin-top: rem(16px);
}

.products {
  width: 100%;
  margin-top: rem(10px);
}

.product {
  display: flex;
  margin-bottom: rem(10px);
}

.productCheckbox {
  width: rem(200px);
}

.productSelect{
  margin-left: rem(20px);
}

.button {
  width: rem(230px);
  margin-right: rem(30px);
}
</style>
