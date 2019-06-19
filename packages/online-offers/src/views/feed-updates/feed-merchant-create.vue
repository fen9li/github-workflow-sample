<script>
import get from 'lodash/get'
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    uploadcare,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        classifications: [],
      },
      rules: {},
      // classificationsOptions: ['Cooling & Heating', 'Clothing', 'Floor Care', 'Kitchen & Cooking'],
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    currency() {
      return get(this.row, 'payload.PublicTerms.PayoutTermsList[0].PayoutCurrency')
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
    uploaderPlaceholder() {
      return this.clientLogoName || 'Select file'
    },
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
  },
  methods: {
    ...mapActions('merchants', [
      'createMerchant',
    ]),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    onSuccessUploading(img) {
      this.form.clientLogo = img.originalUrl
      this.clientLogoName = img.name
    },
    onSubmit() {
      const payload = {
        feed_merchant: this.row.external_id,
        ...this.form,
      }
      this.createMerchant(payload).then(() => {
        this.$emit('close-dialog')
        this.updateTable()
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

    <el-form-item label="Merchant Name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item
      label="Merchant Image"
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
          :class="$style['form-uploader-tip']"
        >
          {{ uploaderPlaceholder }}
        </div>
      </div>
    </el-form-item>

    <el-form-item label="Summary">
      <el-input
        v-model="form.summary"
        type="textarea"
        autosize
      />
    </el-form-item>

    <el-form-item label="Website">
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

    <el-form-item label="Terms & Conditions">
      <el-input
        v-model="form.terms"
        type="textarea"
        autosize
      />
    </el-form-item>
    <el-button
      type="primary"
      :class="$style.submit"
      @click="onSubmit"
    >
      Save
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

.form-uploader-tip {
  flex-grow: 1;
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
