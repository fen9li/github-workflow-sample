<script>
import { mask } from 'vue-the-mask'
import { mapActions } from 'vuex'

export default {
  name: 'UserForm',
  directives: {
    mask,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      form: {
        // Mocked. Required by backed but not present in design
        password: "12345678",
        productVersions: [
          {
            "product": "4c249cf1-b847-11e9-9f0a-0242ac130002",
            "version": "4c2a85b3-b847-11e9-9f0a-0242ac130002"
          }
        ],
        roles: ["testRole"]
      },
      loading: false,
      saving: false,
      select1: [],
      select2: [],
    }
  },
  computed: {
    products() {
      return [
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
      ]
    },
    rules() {
      return {
        givenName: [
          {
            // required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        familyName: [
          {
            // required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            // required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            // required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        provider: [
          {
            // required: true,
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
    },
  },
  mounted () {
    if (this.id) this.getData()
  },
  methods: {
    ...mapActions('user', ['createUser', 'updateUser']),
    async getData() {
      this.loading = true
      const [, response] = await this.$api.get(`/users/${this.id}`)
      if (response) {
        this.form = { ...response }
      }
      this.loading = false
    },
    onCancel() {
      this.$router.go(-1)
    },
    async onSave() {
      const { id, form }  = this
      this.saving = true
      let response
      if (this.id) {
        [, response] = await this.updateUser({ id, form })
      } else  {
        [, response] = await this.createUser(form)
      }
      if (response) {
        this.$router.push({
          name: 'user',
          params: {
            id: response.id,
          },
        })
      }
      this.saving = false
    },
  },
}
</script>

<template>
  <main-layout
    :title="id ? 'Edit User' : 'Create User'"
    :loading="loading"
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
              v-model="form.givenName"
              data-test="givenName"
            />
          </el-form-item>
          <el-form-item
            label="Last Name"
            prop="familyName"
          >
            <el-input
              v-model="form.familyName"
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
              v-model="form.email"
              data-test="email"
            />
          </el-form-item>
          <el-form-item
            label="Telephone"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
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
              v-model="form.provider"
              data-test="provider"
            />
          </el-form-item>
          <el-form-item
            label="Status"
            prop="familyName"
          >
            <el-select
              v-model="form.status"
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
              v-model="form.products"
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
            :disabled="saving"
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
