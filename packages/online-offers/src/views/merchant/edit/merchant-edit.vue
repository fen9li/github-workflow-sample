<script>
// import merchantEditBlock from './merchant-edit-block'
// import merchantFeedData from '@tests/__fixtures__/merchant-details-feed'
// import merchantRemoveModal from './merchant-remove'
// import allClassifications from '@tests/__fixtures__/merchant-classifications'
// import cloneDeep from 'lodash/cloneDeep'
import EditLayout from '../../../components/edit-layout/edit-layout'

export default {
  name: 'MerchantDetailsEdit',
  components: {
    EditLayout,
    // merchantEditBlock,
    // merchantRemoveModal,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // merchantFeedData,
      // merchantsFeedDetails: [],
      // originalDetails: {},
      // currentDetails: {},
      // allClassifications,
      // availableClassifications: [],
      // modal: {
      //   remove: false,
      // },
      fields: [
        {
          key: 'name',
          label: 'Merchant name',
          path: 'name',
          type: 'el-input',
          rules: [
            { required: true, message: 'merchant name is required' },
          ],
        }, {
          key: 'logo',
          label: 'Merchant Image',
          path: 'logo',
          type: 'edit-layout-image',
          rules: [
            { required: true, message: 'merchant logo is required' },
          ],
        }, {
          key: 'summary',
          label: 'Summary',
          path: 'summary',
          type: 'el-input',
          typeBindings: {
            type: 'textarea',
            rows: 3,
          },
        }, {
          key: 'website',
          label: 'Merchant Website',
          path: 'website',
          rules: [
            { required: true, message: 'website url is required' },
          ],
          type: 'el-input',
          slots: [
            {
              name: 'prepend',
              value: 'http://',
            },
          ],
        }, {
          key: 'categories',
          label: 'Classification',
          path: 'categories',
          rules: [
            { required: true, message: 'classification is required' },
          ],
          type: 'edit-layout-categories',
          // typeBindings: {
          // },
        }, {
          key: 'terms',
          label: 'Terms & Conditions',
          path: 'terms',
          rules: [
            { required: true, message: 'terms is required' },
          ],
          type: 'el-input',
          typeBindings: {
            type: 'textarea',
            rows: 3,
          },
        },
      ],
    }
  },
  created() {
    // const { formatDetails, details } = this
    // this.originalDetails = cloneDeep(this.details)
    // this.currentDetails = formatDetails(details)
    // this.merchantsFeedDetails = this.merchantFeedData.map(v => formatDetails(v))
    // this.formatClassifications()
  },
  methods: {
    // formatDetails(source) {
    //   const sourceCopy = cloneDeep(source)
    //   const formatedData = {}

    //   for (const item in sourceCopy) {
    //     if (sourceCopy.hasOwnProperty(item)) {
    //       formatedData[item] = {
    //         value: sourceCopy[item],
    //         selected: false,
    //       }
    //     }
    //   }
    //   return formatedData
    // },
    // formatClassifications() {
    //   this.availableClassifications = this.allClassifications.map(item => {
    //     return {
    //       label: item,
    //       value: item.toLowerCase().replace('& ', '').split(' ').join('-'),
    //     }
    //   })
    // },
    // saveChanges() {
    //   console.warn(this.currentDetails)
    // },
    // changeLocalValue(event) {
    //   if (event.type === 'commission') {
    //     this.currentDetails.commissionRates.value[event.field] = event.newValue
    //   } else {
    //     this.currentDetails[event.field].value = event.newValue
    //   }
    // },
    // applyNewValue(event) {
    //   const { currentDetails, originalDetails, merchantsFeedDetails } = this

    //   if (event.field === 'all') {
    //     this.applyAllNewValues(event)
    //     return
    //   }

    //   if (event.type === 'commission') {
    //     this.applyRates(event)
    //     return
    //   }
    //   const sourceActiveIndex = merchantsFeedDetails.findIndex(item => item.id.value === event.sourceId)

    //   merchantsFeedDetails[sourceActiveIndex][event.field].selected = event.apply

    //   currentDetails[event.field].value =
    //   event.apply ? event.newValue : originalDetails[event.field]

    //   currentDetails[event.field].selected = event.apply

    //   this.unselectOldValue(event.sourceId, event.field)
    // },
    // applyAllNewValues(event) {
    //   const { originalDetails, formatDetails } = this

    //   if (event.apply) {
    //     this.currentDetails = event.newValue
    //     this.merchantsFeedDetails.forEach(merchant => {
    //       for (const field in merchant) {
    //         if (merchant.hasOwnProperty(field)) {
    //           merchant[field].selected = (merchant.id.value === event.sourceId)
    //         }
    //       }
    //     })
    //   } else {
    //     this.currentDetails = formatDetails(originalDetails)
    //   }
    // },
    // unselectOldValue(sourceId, field) {
    //   this.merchantsFeedDetails.forEach(merchant => {
    //     if (merchant.id.value !== sourceId) {
    //       merchant[field].selected = false
    //     }
    //   })
    // },
    // applyRates(event) {
    //   const { currentDetails, merchantsFeedDetails } = this
    //   currentDetails.commissionRates.selected = true
    //   currentDetails.commissionRates.value = event.newValue
    //   merchantsFeedDetails.forEach(merchant => {
    //     merchant.commissionRates.selected = (merchant.id.value === event.sourceId)
    //   })
    // },
  },
}
</script>

<template>
  <!--

    :presets="feedOffers"
    @update="submitUpdateForm"
    @remove="modals.remove = true" -->
  <edit-layout
    :source="details"
    :fields="fields"
    @cancel="$emit('cancel')"
  >
    <template slot="removeButton">
      <span>Delete Global Merchant</span>
    </template>
    <template slot="updateButton">
      <span>Save Changes</span>
    </template>
  </edit-layout>
  <!-- <div> -->
  <!-- <div :class="$style.editBlocks">
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
    </div> -->
  <!-- <div class="online-offers__edit-controls">
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
    </div> -->
  <!-- </div> -->
</template>

<style lang="scss" module>
/* .editBlocks {
  display: flex;
  overflow-x: auto;
} */
</style>
