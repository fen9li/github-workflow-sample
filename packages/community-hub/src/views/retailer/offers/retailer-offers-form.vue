<script>
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import capitalize from 'lodash/capitalize'
import { mask } from 'vue-the-mask'
import { datePickerFormat } from '@lib/utils/date-helper'
import categoriesData from '@tests/__fixtures__/categories'

export default {
  name: 'RetailerOffersForm',
  directives: {
    mask,
  },
  props: {
    offer: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      datePickerFormat,
      categories: categoriesData,
      form: {
        status: 'active',
        offer_name: '',
        categories: [],
        locations: [''],
        description: '',
        terms: '',
        end_at: '',
        offer_type: '',
        logo: '',
        coupon_code: '',
        coupon_code_use: '',
        offer_url: '',
        url: '',
      },
      rules: {
        offer_name: {
          required: true,
          message: 'Offer name is required',
        },
        categories: {
          required: true,
          message: 'Category is required',
        },
        description: [
          {
            required: true,
            message: 'Offer description is required',
          },
          {
            max: 255,
            message: 'Length should be less than 255',
          }
        ],
        offer_type: {
          required: true,
          message: 'Offer type is required',
        },
        logo: {
          required: true,
          message: 'Redemption image is required',
        },
        coupon_code: {
          required: true,
          message: 'Coupon code is required',
        },
        offer_url: {
          required: true,
          message: 'Offer URL is required',
        },
        url: {
          required: true,
          message: 'URL is required',
        },
      },
      showDeleteDialog: false,
      offerTypes: [
        {
          value: 'Show and Save',
          label: 'Show and Save (Show to Redeem)'
        },
        {
          value: 'Coupon Code',
          label: 'Coupon Code (Redeem at Checkout)'
        },
        {
          value: 'URL',
          label: 'URL'
        }
      ],
      locationsMaxCount: 5,
    }
  },
  computed: {
    isEdit() {
      return get(this.offer, 'id')
    },
    categoriesList() {
      return get(this.categories, 'table', [])
    },
    status() {
      return capitalize(this.form.status)
    },
    isOfferTypeShow() {
      if (!this.form.offer_type) return
      return this.form.offer_type === 'Show and Save'
    },
    isOfferTypeCoupon() {
      if (!this.form.offer_type) return
      return this.form.offer_type === 'Coupon Code'
    },
    isOfferTypeUrl() {
      if (!this.form.offer_type) return
      return this.form.offer_type === 'URL'
    },
  },
  watch: {
    'form.offer_type'() {
      if (this.isOfferTypeCoupon) {
        this.form.coupon_code_use = 'online only'
      }

      if (!this.isOfferTypeShow) {
        this.form.logo = ''
      }

      if (!this.isOfferTypeCoupon) {
        this.form.coupon_code = ''
        this.form.coupon_code_use = ''
        this.form.offer_url = ''
      }

      if (!this.isOfferTypeUrl) {
        this.form.url = ''
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.form = Object.assign(this.form, cloneDeep(this.offer))
    }
  },
  methods: {
    changeEndDate(fieldName, newVal) {
      this.$emit('changeEndDate', { fieldName, newVal })
    },
    changeCouponCode(value) {
      this.form.coupon_code = value.toUpperCase()
    },
    addLocation() {
      this.form.locations.push('')
    },
    removeLocation(idx) {
      this.form.locations.splice(idx, 1)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {

          // const data = { ...this.form, locations: this.form.locations
          //   .filter(value => value)
          // }

          this.$notify({
            type: 'success',
            title: 'Offer saved',
            message: this.isEdit ? 'Changes successfully saved.' : 'New offer successfully saved.',
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.form = cloneDeep(this.offer)
      this.$emit('cancel')
    },
    onDelete() {
      this.showDeleteDialog = false

      this.$notify({
        type: 'success',
        title: 'Offer deleted',
        message: 'Offer successfully deleted.',
      })
    },
  },
}
</script>

<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      class="card-form"
    >
      <el-form-item
        label="Status"
        prop="status"
        required
      >
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#a7a7a7"
          active-value="active"
          inactive-value="inactive"
        />
        <span :class="$style.status">
          {{ status }}
        </span>
      </el-form-item>
      <el-form-item
        label="Offer Name"
        prop="offer_name"
        required
      >
        <el-input v-model="form.offer_name" />
      </el-form-item>
      <el-form-item
        label="Category"
        prop="categories"
      >
        <el-select
          v-model="form.categories"
          multiple
          placeholder="Select categories..."
        >
          <el-option
            v-for="category in categoriesList"
            :key="category.category_name"
            :label="category.category_name"
            :value="category.category_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Offer Description"
        prop="description"
      >
        <the-textarea
          v-model="form.description"
          :class="$style.fullwidth"
        />
      </el-form-item>
      <el-form-item
        label="Participating Locations"
        prop="locations"
      >
        <div :class="$style.fullwidth">
          <div
            v-for="(location, index) in form.locations"
            :key="index"
            :class="$style.locationItem"
          >
            <el-input v-model="form.locations[index]" />
            <el-button
              v-if="form.locations && form.locations.length > 1"
              type="info"
              icon="el-icon-close"
              circle
              size="mini"
              :class="$style.locationItemBtn"
              @click="removeLocation(index)"
            />
          </div>
          <el-button
            :disabled="form.locations && form.locations.length >= locationsMaxCount"
            type="text"
            icon="el-icon-plus"
            @click="addLocation"
          >
            Add location
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="Offer End Date">
        <el-date-picker
          v-model="form.end_at"
          v-mask="['##/##/####']"
          type="date"
          format="dd/MM/yyyy"
          :value-format="datePickerFormat"
          placeholder="Enter Date"
          @input="changeEndDate('end_at', $event)"
        />
      </el-form-item>
      <el-form-item
        label="Offer Terms and Conditions"
        prop="terms"
      >
        <the-textarea
          v-model="form.terms"
          :max-chars="null"
          :class="$style.fullwidth"
        />
      </el-form-item>
      <el-form-item
        label="Offer Type"
        prop="offer_type"
      >
        <el-select
          v-model="form.offer_type"
          placeholder="Select an offer type"
        >
          <el-option
            v-for="item in offerTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <template v-if="isOfferTypeShow">
        <el-form-item
          label="Redemption Image (860 x 860 px minimum) "
          prop="logo"
        >
          <hub-image-uploader
            v-model="form.logo"
            :class="$style.fullwidth"
          >
            <template #title>
              <div :class="$style.uploadPlus">
                +
              </div> Select file
            </template>
          </hub-image-uploader>
        </el-form-item>
      </template>
      <template v-if="isOfferTypeCoupon">
        <el-form-item
          label="Coupon Code"
          prop="coupon_code"
        >
          <el-input
            :value="form.coupon_code"
            @input="changeCouponCode"
          />
        </el-form-item>

        <el-form-item>
          <el-radio-group
            v-model="form.coupon_code_use"
            prop="coupon_code_use"
          >
            <el-radio
              label="online only"
              border
              :class="$style.radio"
            >
              Online only
            </el-radio>
            <el-radio
              label="in-store only"
              border
              :class="$style.radio"
            >
              In-Store only
            </el-radio>
            <el-radio
              label="online and in-store"
              border
              :class="$style.radio"
            >
              Online and In-Store
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="form.coupon_code_use === 'online only' || form.coupon_code_use === 'online and in-store'"
          label="Offer URL"
          prop="offer_url"
        >
          <el-input v-model="form.offer_url" />
        </el-form-item>
      </template>
      <template v-if="isOfferTypeUrl">
        <el-form-item
          label="URL"
          prop="url"
        >
          <el-input v-model="form.url" />
        </el-form-item>
      </template>
    </el-form>
    <div class="card-footer">
      <div v-if="isEdit">
        <el-button
          type="danger"
          @click.stop="showDeleteDialog = true"
        >
          Delete Offer
        </el-button>
      </div>
      <div>
        <el-button @click="onCancel">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Save Offer
        </el-button>
      </div>
    </div>

    <state-dialog
      :visible.sync="showDeleteDialog"
      title="Delete Offer"
    >
      <el-icon
        slot="icon"
        name="warning"
      />
      <el-button
        slot="subicon"
        icon="el-icon-delete"
        type="danger"
        circle
      />
      <div :class="$style.msg">
        Are you sure you wish to delete this offer?
      </div>
      <div class="modal__footer">
        <el-button
          type="danger"
          class="el-button--wide"
          @click="onDelete"
        >
          Delete offer
        </el-button>
      </div>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>
  .status {
    margin-left: rem(14px);
  }

  .fullwidth {
    width: 100%;
  }

  .uploadPlus {
    display: inline-flex;
    margin-right: rem(4px);
    transform: scale(1.6);
  }

  .locationItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(20px);
  }

  .locationItemBtn {
    margin-left: rem(20px);
  }

  .radio {
    margin-right: rem(10px);
  }

  .msg {
    text-align: center;
    white-space: nowrap;
  }

  .subicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    color: var(--color-primary-text);
    background-color: var(--color-error);
    border-radius: 50%
  }
</style>
