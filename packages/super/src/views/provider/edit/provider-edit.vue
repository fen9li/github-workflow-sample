<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProviderEdit',
  props: {
    provider: {
      type: Object,
      default: () => {},
    },
    progress: {
      type: Boolean,
      default: false,
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null,
        twoFactor: null,
        timezone: 'Melbourne (GMT + 10)',
        products: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        timezone: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        // products: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: 'This field is required',
        //     trigger: 'change',
        //   },
        // ],
      },
    }
  },
  watch: {
    provider() {
      this.prefillFields()
    },
  },
  created() {
    if (!this.create) {
      this.prefillFields()
    }
  },
  methods: {
    ...mapActions('provider', [
      'createProvider',
      'updateProvider',
    ]),
    prefillFields() {
      if (this.provider) {
        this.form = this.provider
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        this.$emit('submit', this.form)
      })
    },
    onCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<template>
  <el-card>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :class="$style.form"
      label-position="top"
    >
      <el-form-item
        label="Provider Name"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="Name"
        />
      </el-form-item>
      <el-form-item
        label="Provider Description"
        prop="description"
        type="textarea"
      >
        <el-input
          v-model="form.description"
          placeholder="Description"
        />
      </el-form-item>
      <el-form-item
        label="Provider Timezone"
        prop="timezone"
      >
        <el-select
          v-model="form.timezone"
          placeholder="please select timezone"
          disabled
        >
          <el-option
            :label="form.timezone"
            :value="form.timezone"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="twoFactor"
      >
        <el-checkbox
          v-model="form.twoFactor"
          label="Enforce Two-Factor Authen6ca6on"
        />
      </el-form-item>
      <el-form-item
        label="Status"
        prop="status"
      >
        <el-select
          v-model="form.status"
          placeholder="Please select status"
        >
          <el-option
            label="Active"
            value="active"
          />
          <el-option
            label="Inactive"
            value="inactive"
          />
        </el-select>
      </el-form-item>
      <!-- TODO Versions -->
      <el-form-item
        label="Products"
        prop="products"
        :class="$style.products"
      >
        <div
          v-for="(product, index) in form.products"
          :key="index"
          :class="$style.product"
        >
          <el-checkbox
            :key="index"
            :label="product.name"
            :class="$style.productCheckbox"
            disabled
          />
          <el-select
            :key="`select_${index}`"
            v-model="product.defaultVersion"
            :class="$style.productSelect"
            placeholder="please select version"
          >
            <el-option
              v-for="(version, i) in product.versions"
              :key="i"
              :value="version"
            />
          </el-select>
        </div>
      </el-form-item>
      <!-- /TODO Versions -->
      <div :class="$style.formFooter">
        <el-button
          type="primary"
          plain
          @click="onCancel"
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          :loading="progress"
          @click="onSubmit"
        >
          Save
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" module>
.form {
  max-width: rem(470px);
}

.products {
  display: flex;
  flex-direction: column;

  :global {
    .el-form-item__content {
      flex-direction: column;
    }
  }
}

.product {
  display: flex;
  align-items: center;
  width: 100%;
  margin: rem(0 0 20px);
}

.productCheckbox {
  width: rem(200px);
}
</style>
