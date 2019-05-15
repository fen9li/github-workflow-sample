<script>
import editBlock from './offer-edit-block'
import globalMerchantOffer from '@tests/__fixtures__/merchant-offer-feed'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'MerchantOfferEdit',
  components: {
    editBlock,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      globalMerchantOffer,
      merchantOfferFeedData: {},
      originalDetails: {},
      currentDetails: {},
    }
  },
  created() {
    this.originalDetails = cloneDeep(this.details)
    this.currentDetails = cloneDeep(this.details)
    this.formatDetails('currentDetails', 'details')
    this.formatDetails('merchantOfferFeedData', 'globalMerchantOffer')
  },
  methods: {
    formatDetails(objName, source) {
      const sourceCopy = this[objName] = cloneDeep(this[source])
      for (const item in this[objName]) {
        if (sourceCopy.hasOwnProperty(item)) {
          sourceCopy[item] = {
            value: sourceCopy[item],
            selected: false,
          }
        }
      }
    },
    removeOffer() {

    },
    saveChanges() {
      console.warn(this.currentDetails)
    },
    changeLocalValue(event) {
      this.currentDetails[event.field].value = event.newValue
    },
    applyNewValue(event) {
      const { currentDetails, originalDetails } = this
      if (event.field === 'all') {
        if (event.apply) {
          this.currentDetails = event.newValue
        } else {
          this.formatDetails('currentDetails', 'originalDetails')
        }
        return
      }

      if (event.apply) {
        currentDetails[event.field].value = event.newValue
        currentDetails[event.field].selected = event.apply
      } else {
        currentDetails[event.field].value = originalDetails[event.field]
        currentDetails[event.field].selected = event.apply
      }
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.editBlocks">
      <!-- Temporary structure. Apparently might be more that 2 block, in that case loop will be used -->
      <edit-block
        :details="currentDetails"
        :current-item="true"
        @valueChange="changeLocalValue"
      />
      <edit-block
        :details="merchantOfferFeedData"
        @valueChange="applyNewValue"
      />
    </div>
    <div :class="$style.controls">
      <el-button
        type="danger"
        class="wide-button"
        @click="removeOffer"
      >
        Remove Offer
      </el-button>
      <div :class="$style.save">
        <div :class="$style.notice">
          <i :class="['el-icon-info', $style.noticeIcon]" />
          This changes will be made for all clients that have this Merchant available
        </div>
        <el-button
          type="primary"
          class="wide-button"
          @click="saveChanges"
        >
          Save Changes
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.editBlocks {
  display: flex;
}

.controls {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
}

.save {
  display: flex;
}

.notice {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-right: 2rem;
  color: #606266;
  background-color: #F2F2F2;
  border-radius: .25rem;
}

.noticeIcon {
  padding-right: .5rem;
  font-size: 1.2rem;
  color: var(--color-primary);
}

.divider {
  height: 1px;
  background-color: var(--color-divider);
  border: none;
}
</style>
