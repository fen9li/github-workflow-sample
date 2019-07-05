<script>
import get from 'lodash/get'
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import DataProcessor from '@lib/processors/data-processor'

export default {
  components: {
    uploadcare,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
  data() {
    return {
      form: {
        classifications: [],
        name: this.row.map.name,
        logo: this.row.map.logo,
        website: this.row.map.website,
        terms: this.row.map.terms,
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        logo: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        website: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        terms: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
      // classificationsOptions: ['Cooling & Heating', 'Clothing', 'Floor Care', 'Kitchen & Cooking'],
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
      search: '',
      selectedItem: null,
      newItem: {
        name: '+ New Global Merchant',
      },
    }
  },
  computed: {
    ...mapState('categories', [
      'categories',
    ]),
    currency() {
      return get(this.row, 'payload.PublicTerms.PayoutTermsList[0].PayoutCurrency')
    },
    disabled() {
      return !get(this.form, 'name.length', false)
    },
    merchantId() {
      return get(this.selectedItem, 'id')
    },
    rate() {
      const base = get(this.row, 'payload.PublicTerms.PayoutTermsList[0].PayoutAmount', '')
      const min = get(this.row, 'payload.PublicTerms.PayoutTermsList[0].PayoutAmountLowerLimit', '')
      const max = get(this.row, 'payload.PublicTerms.PayoutTermsList[0].PayoutAmountUpperLimit', '')
      return `Base $${base} Min $${min} Max $${max}`
    },
    trackingLing() {
      return get(this.row, 'payload.TrackingLink')
    },
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
  },
  methods: {
    ...mapActions('merchants', [
      'createMerchant',
      'searchMerchants',
      'associateMerchant',
    ]),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    async querySearchAsync(queryString, cb) {
      const [, { items = [] }] = await this.searchMerchants(queryString)
      const suggestions = [this.newItem, ...items]
      cb(suggestions.map((item, index) => {
        return {
          value: item.name,
          index,
          item,
        }
      }))
    },
    handleSelect({ item }) {
      this.selectedItem = item
    },
    handleClear() {
      this.selectedItem = null
    },
    onSuccessUploading(img) {
      this.form.logo = img.cdnUrl
    },
    onSubmit() {
      if (this.merchantId) {
        this.associateMerchant({
          merchantId: this.merchantId,
          feedmerchantId: this.row.id,
        }).then(() => this.processor.getData())
          .then(() => this.onSubmitResponse())
      } else {
        const payload = {
          feed_merchant: this.row.external_id,
          ...this.form,
        }
        this.createMerchant(payload)
          .then(() => this.processor.getData())
          .then(() => this.onSubmitResponse())
      }
    },
    onSubmitResponse() {
      this.$emit('close-dialog')
      this.$notify({
        type: 'success',
        title: 'Success',
        message: `FeedMerchant successfuly ${this.merchantId ? 'associated' : 'created'}`,
      })
    },
  },
}
</script>

<template>
  <el-form
    :model="form"
    :rules="rules"
    label-width="100%"
    label-position="top"
  >
    <el-alert
      v-if="selectedItem"
      type="warning"
      :class="$style.alert"
      :closable="false"
    >
      You want to {{ `${merchantId ? 'associate' : 'create'}` }} <b>{{ row.name }}</b> with <b>{{ selectedItem.name }}</b>
    </el-alert>
    <el-form-item
      label="Global Merchant"
      prop="merchant"
    >
      <el-autocomplete
        v-model="search"
        :fetch-suggestions="querySearchAsync"
        :class="$style.search"
        placeholder="Please input or select from list"
        clearable
        @select="handleSelect"
        @clear="handleClear"
      >
        <template slot-scope="{ item }">
          <template v-if="!item.index">
            <b>{{ item.value }}</b>
          </template>
          <template v-else>
            {{ item.value }}
          </template>
        </template>
      </el-autocomplete>
    </el-form-item>

    <template v-if="selectedItem">
      <dl :class="$style.datalist">
        <dt>Merchant Ext ID</dt>
        <dd>{{ row.external_id }}</dd>

        <dt>Commission Aggregator</dt>
        <dd>{{ row.feed }}</dd>

        <dt>Commission Type</dt>
        <dd>{{ currency }}</dd>

        <dt>Commission Rate</dt>
        <dd>{{ rate }}</dd>

        <dt>Merchant Tracking URL</dt>
        <dd>{{ trackingLing }}</dd>
      </dl>

      <el-form-item
        label="Merchant Name"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item
        label="Merchant Image"
        prop="logo"
      >
        <!-- <el-input v-model="form.image" /> -->
        <div :class="$style.uploader">
          <uploadcare
            :public-key="uploadcare.publicKey"
            :secure-signature="uploadcareSignature"
            :secure-expire="uploadcare.expire"
            :class="$style.uploadcare"
            crop="160x60"
            @success="onSuccessUploading"
          >
            <el-button
              plain
              :class="$style.uploadButton"
            >
              Upload
            </el-button>
          </uploadcare>
          <div
            slot="tip"
            :class="$style.formUploaderTip"
          >
            <img
              v-if="form.logo"
              :src="form.logo"
              :class="$style.formLogo"
            >
            <span v-else>
              Select file
            </span>
          </div>
        </div>
      </el-form-item>

      <el-form-item
        label="Summary"
        prop="summary"
      >
        <el-input
          v-model="form.summary"
          type="textarea"
          autosize
        />
      </el-form-item>

      <el-form-item
        label="Website"
        prop="website"
      >
        <el-input v-model="form.website" />
      </el-form-item>

      <el-form-item
        label="Classifications"
      >
        <el-checkbox-group
          v-model="form.classifications"
          :class="$style.classifications"
        >
          <el-checkbox
            v-for="option in categories"
            :key="option.id"
            :label="option.id"
            :class="$style.classItem"
          >
            {{ option.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item
        label="Terms & Conditions"
        prop="terms"
      >
        <el-input
          v-model="form.terms"
          type="textarea"
          autosize
        />
      </el-form-item>
    </template>

    <el-button
      type="primary"
      :class="$style.submit"
      :disabled="disabled"
      @click="onSubmit"
    >
      {{ `${merchantId ? 'Associate' : 'Create'}` }}
    </el-button>
  </el-form>
</template>

<style lang="scss" module>

.dialog {
  cursor: default;
}

.datalist {
  display: flex;
  flex-wrap: wrap;

  :global {
    dt {
      flex-basis: 40%;
    }
    dd {
      flex-basis: 40%;
      font-weight: bold;
    }
  }
}

.search {
  width: 100%;
}

.uploader {
  display: flex;
  width: 100%;
  padding-left: rem(15px);
  border: rem(1px) solid #DCDFE6;
  border-radius: rem(4px);
}

.uploadcare{
  order: 2;
}

.uploadButton {
  height: 100%;
  background-color: #DCDFE6;
  border-width: 0 0 0 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover {
    border-color: #DCDFE6 !important;
  }
}

.alert {
  margin-bottom: rem(22px);
}

.formUploaderTip {
  flex-grow: 1;
}

.formLogo {
  max-width: 12rem;
  height: auto;
  margin: rem(15px 0);
  overflow: hidden;
}

.classifications {
  display: flex;
  flex-wrap: wrap;
}

.classItem {
  flex-basis: 50%;
  margin-right: 0;
  margin-bottom: rem(4px);

  span {
  font-size: 0.875rem;
  }
}

.submit {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>
