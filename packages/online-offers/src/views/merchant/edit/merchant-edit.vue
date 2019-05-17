<script>
import merchantEditBlock from './merchant-edit-block'
import merchantFeedData from '@tests/__fixtures__/merchant-details-feed'
import merchantRemoveModal from './merchant-remove'
import allClassifications from '@tests/__fixtures__/merchant-classifications'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'MerchantDetailsEdit',
  components: {
    merchantEditBlock,
    merchantRemoveModal,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checks: {
        apd: 'APD',
        cf: 'Commission Factory',
        rakuten: 'Rakuten',
      },
      merchantFeedData,
      merchantsFeedDetails: [],
      originalDetails: {},
      currentDetails: {},
      allClassifications,
      availableClassifications: [],
      modal: {
        remove: false,
      },
    }
  },
  created() {
    const { formatDetails, details } = this
    this.originalDetails = cloneDeep(this.details)
    this.currentDetails = formatDetails(details)
    this.merchantsFeedDetails = this.merchantFeedData.map(v => formatDetails(v))
    this.formatClassifications()
  },
  methods: {
    formatDetails(source) {
      const sourceCopy = cloneDeep(source)
      const formatedData = {}

      for (const item in sourceCopy) {
        if (sourceCopy.hasOwnProperty(item)) {
          formatedData[item] = {
            value: sourceCopy[item],
            selected: false,
          }
        }
      }
      return formatedData
    },
    formatClassifications() {
      this.availableClassifications = this.allClassifications.map(item => {
        return {
          label: item,
          value: item.toLowerCase().replace('& ', '').split(' ').join('-'),
        }
      })
    },
    saveChanges() {
      console.warn(this.currentDetails)
    },
    changeLocalValue(event) {
      if (event.type === 'commission') {
        this.currentDetails.commissionRates.value[event.field] = event.newValue
      } else {
        this.currentDetails[event.field].value = event.newValue
      }
    },
    applyNewValue(event) {
      const { currentDetails, originalDetails, merchantsFeedDetails } = this

      if (event.field === 'all') {
        this.applyAllNewValues(event)
        return
      }

      if (event.type === 'commission') {
        this.applyRates(event)
        return
      }
      const sourceActiveIndex = merchantsFeedDetails.findIndex(item => item.id.value === event.sourceId)

      merchantsFeedDetails[sourceActiveIndex][event.field].selected = event.apply

      currentDetails[event.field].value =
      event.apply ? event.newValue : originalDetails[event.field]

      currentDetails[event.field].selected = event.apply

      this.unselectOldValue(event.sourceId, event.field)
    },
    applyAllNewValues(event) {
      const { originalDetails, formatDetails } = this

      if (event.apply) {
        this.currentDetails = event.newValue
        this.merchantsFeedDetails.forEach(merchant => {
          for (const field in merchant) {
            if (merchant.hasOwnProperty(field)) {
              merchant[field].selected = (merchant.id.value === event.sourceId)
            }
          }
        })
      } else {
        this.currentDetails = formatDetails(originalDetails)
      }
    },
    unselectOldValue(sourceId, field) {
      this.merchantsFeedDetails.forEach(merchant => {
        if (merchant.id.value !== sourceId) {
          merchant[field].selected = false
        }
      })
    },
    applyRates(event) {
      const { currentDetails, merchantsFeedDetails } = this
      currentDetails.commissionRates.selected = true
      currentDetails.commissionRates.value = event.newValue
      merchantsFeedDetails.forEach(merchant => {
        merchant.commissionRates.selected = (merchant.id.value === event.sourceId)
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div :class="$style.aggregators">
        <div :class="$style.aggregatorsTitle">
          Commission Aggregators
        </div>
        <div :class="$style.aggregatorsList">
          <el-radio
            v-model="checks.cf"
            border
            label="Commission Factory"
          />
          <el-radio
            v-model="checks.rakuten"
            label="Rakuten"
            border
          />
          <el-radio
            v-model="checks.apd"
            label="APD"
            border
          />
        </div>
      </div>
      <div class="online-offers__edit-notice">
        <i class="el-icon-info noticeIcon" />
        The commission will be paid by the selected Commission Aggregator, regardless of the Merchant's details.
      </div>
    </div>
    <div :class="$style.editBlocks">
      <merchant-edit-block
        :details="currentDetails"
        :available-classifications="availableClassifications"
        :current-item="true"
        @valueChange="changeLocalValue"
      />
      <merchant-edit-block
        v-for="(merchantDetails, index) in merchantsFeedDetails"
        :key="index"
        :details="merchantDetails"
        :show-new-btn="index === 0"
        @valueChange="applyNewValue"
      />
    </div>
    <div class="online-offers__edit-controls">
      <el-button
        type="danger"
        class="wide-button"
        @click="modal.remove = true"
      >
        Remove Merchant
      </el-button>
      <div class="save-block">
        <div class="online-offers__edit-notice">
          <i class="el-icon-info noticeIcon" />
          This changes will be made for all clients that have this Merchant available
        </div>
        <el-button
          type="primary"
          class="wide-button save-button"
          @click="saveChanges"
        >
          Save Changes
        </el-button>
      </div>
      <merchant-remove-modal
        v-if="modal.remove"
        :merchant="details"
        :visible.sync="modal.remove"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
}

.editBlocks {
  display: flex;
  overflow-x: auto;
}

.aggregators {
  display: flex;
  flex-basis: 40%;
  justify-content: space-between;
  max-width: 32rem
}

.aggregatorsTitle {
  width: 6rem;
  font-size: .875rem;
  color: #606266;
}

.aggregatorsList {
  display: flex;

  :global {
    .el-radio {
      margin: 0 .2rem;
    }
    }
}
</style>
