<script>
import get from 'lodash/get'
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import { mapActions, mapState } from 'vuex'
import DataProcessor from '@lib/processors/data-processor'
import formatCommission from '@lib/utils/format-commission'
import sortBy from 'lodash/sortBy'
import concat from 'lodash/concat'

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
      suggestions: [],
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
      search: '',
      selectedItem: null,
      isCreate: false,
      newItem: {
        name: '+ New Global Merchant',
      },
    }
  },
  computed: {
    ...mapState('categories', [
      'categories',
    ]),
    commission() {
      return formatCommission(this.row.map.commission)
    },
    submitDisabled() {
      if (!this.selectedItem) {
        return true
      } else {
        return !get(this.form, 'name.length', false)
      }
    },
    merchantId() {
      return get(this.selectedItem, 'id')
    },
    trackingLing() {
      return get(this.row, 'payload.TrackingLink')
    },
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
    isSearchEmpty() {
      return !this.search.length
    },
  },
  mounted() {
    this.preloadSuggestions()
  },
  methods: {
    ...mapActions('merchants', [
      'createMerchant',
      'searchMerchants',
      'associateMerchant',
    ]),
    async querySearch(queryString = null, cb) {
      let result = this.suggestions
      if (queryString) {
        result = await this.fetchSuggestions(queryString)
      }
      cb(result)
    },

    async fetchSuggestions(queryString = null) {
      const [, { items = [] }] = await this.searchMerchants(queryString)
      const result = concat([this.newItem], sortBy(items, 'name'))
      return result.map((item, index) => {
        return {
          value: item.name,
          index,
          item,
        }
      })
    },
    async preloadSuggestions() {
      this.suggestions = await this.fetchSuggestions()
    },
    handleSelect({ item }) {
      this.selectedItem = item
    },
    handleClear() {
      this.search = ''
      // this.selectedItem = null
    },
    handleClick(event) {
      if (this.isSearchEmpty) {
        this.$refs.autocomplete.focus()
      } else {
        this.handleClear()
      }
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
    onCreateClick() {
      this.selectedItem = this.newItem
      this.isCreate = true
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
    <div
      v-if="!selectedItem"
      :class="$style.subtitle"
    >
      Associate <b>{{ row.name }}</b> with an existing global merchant or create a new one.<br>
      Can’t find the merchant you are looking for? <span
        :class="$style.create"
        @click="onCreateClick"
      >Create a new one</span>
    </div>
    <el-alert
      v-else
      type="warning"
      :class="$style.alert"
      :closable="false"
    >
      <template v-if="merchantId">
        You want to associate <b>{{ row.name }}</b><br>with <b>{{ selectedItem.name }}</b>
      </template>
      <template v-else>
        You want to create <b>{{ row.name }}</b><br>as new Global Merchant
      </template>
    </el-alert>

    <template v-if="selectedItem">
      <dl
        v-show="merchantId"
        :class="$style.datalist"
      >
        <dt>Merchant Ext ID</dt>
        <dd>{{ row.external_id }}</dd>

        <dt>Commission Aggregator</dt>
        <dd>{{ row.feed }}</dd>

        <template v-if="commission">
          <dt>Commission Type</dt>
          <dd>{{ commission.type }}</dd>

          <dt>Commission Rate</dt>
          <dd>
            <span>
              {{ commission.base }}
            </span>
            <span>
              {{ commission.min }}
            </span>
            <span>
              {{ commission.max }}
            </span>
          </dd>
        </template>

        <dt>Merchant Tracking URL</dt>
        <dd>{{ trackingLing }}</dd>
      </dl>
    </template>

    <el-form-item
      label="Global Merchant"
      prop="merchant"
    >
      <el-autocomplete
        ref="autocomplete"
        v-model="search"
        :fetch-suggestions="querySearch"
        :class="$style.search"
        placeholder="Please input or select from list"
        @select="handleSelect"
      >
        <i
          slot="suffix"
          :class="[
            `el-icon-${isSearchEmpty ? 'arrow-down' : 'close'}`,
            [$style.inputIcon]
          ]"
          @click.stop="handleClick"
        />
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
      <dl
        v-show="!merchantId"
        :class="$style.datalist"
      >
        <dt>Merchant Ext ID</dt>
        <dd>{{ row.external_id }}</dd>

        <dt>Commission Aggregator</dt>
        <dd>{{ row.feed }}</dd>

        <template v-if="commission">
          <dt>Commission Type</dt>
          <dd>{{ commission.type }}</dd>

          <dt>Commission Rate</dt>
          <dd>
            <span>
              {{ commission.base }}
            </span>
            <span>
              {{ commission.min }}
            </span>
            <span>
              {{ commission.max }}
            </span>
          </dd>
        </template>

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
          :class="$style.textarea"
        />
      </el-form-item>
    </template>

    <el-button
      type="primary"
      :class="$style.submit"
      :disabled="submitDisabled"
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

.subtitle {
  padding: rem(0 20px);
  margin: rem(0 0 22px);
  font-size: rem(14px);
  line-height: rem(18px);
  text-align: center;
  word-break: break-word;
}

.inputIcon {
  padding: 12px;
  font-weight: bold;
  cursor: pointer;
}

.create {
  color: var(--color-primary);
  cursor: pointer;
}

.datalist {
  display: flex;
  flex-wrap: wrap;
  line-height: 21px;

  :global {
    dt {
      flex-basis: 40%;
    }
    dd {
      flex-basis: 50%;
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

  :global {
    .el-alert__content,
    .el-alert__description {
      width: 100%;
      text-align: center;
    }
  }
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

.textarea {
  :global {
    .el-textarea__inner {
      max-height: 10rem;
    }
  }
}

.submit {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
</style>
