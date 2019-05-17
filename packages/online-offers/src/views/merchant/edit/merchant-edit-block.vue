<script>
import cloneDeep from 'lodash/cloneDeep'
import capitalize from 'lodash/capitalize'
import editImage from './form-items/merchant-edit-image'
import editCommission from './form-items/merchant-edit-commision'

export default {
  name: 'MerchantOfferEditBlock',
  components: {
    editImage,
    editCommission,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
    currentItem: {
      type: Boolean,
      default: false,
    },
    availableClassifications: {
      type: Array,
      default: () => [],
    },
    showNewBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
    }
  },
  computed: {
    bindings() {
      const { currentItem } = this
      return {
        componentName: currentItem ? 'el-input' : 'el-checkbox',
        model: currentItem ? 'value' : 'selected',
        labelWidth: currentItem ? '150px' : '',
      }
    },
    classificationsString() {
      return this.formData.classifications.value.join(', ')
    },
  },
  watch: {
    details: {
      deep: true,
      handler(newVal) {
        this.formData = cloneDeep(newVal)
      },
    },
  },
  created() {
    this.formData = cloneDeep(this.details)
  },
  methods: {
    capitalize,
    addNewAggregator() {

    },
    onValueChange(value, field) {
      const { formData } = this
      this.$emit('valueChange', {
        apply: value,
        newValue: formData[field].value,
        field,
        sourceId: formData.id.value,
      })
    },
    onCommissionChange(event) {
      this.$emit('valueChange', {
        newValue: event.value,
        field: event.name,
        type: 'commission',
        sourceId: this.formData.id.value,
      })
    },
    onImageLoaded(event) {
      this.$emit('valueChange', {
        newValue: event,
        field: 'image',
      })
    },
    changeAllValues(value) {
      const { formData } = this
      for (const item in formData) {
        if (formData.hasOwnProperty(item)) {
          formData[item].selected = formData.feed.selected
        }
      }
      this.$emit('valueChange', {
        newValue: formData,
        apply: value,
        field: 'all',
        sourceId: formData.id.value,
      })
    },
  },
}
</script>

<template>
  <div :class="[$style.editBlock, {[$style.currentMerchant]: currentItem}]">
    <el-form
      ref="form"
      :class="['form-divided-items', 'online-offers__edit', $style.form, {[$style.hiddenLabels]: !currentItem}]"
      :label-width="bindings.labelWidth"
      label-position="left"
      :model="formData"
    >
      <div
        v-if="currentItem"
        class="current-title"
      >
        Current Details
      </div>
      <el-form-item
        v-if="!currentItem"
      >
        <el-checkbox
          v-model="formData.feed.selected"
          :class="$style.aggrCheckbox"
          @change="changeAllValues"
        >
          {{ formData.feed.value }}
        </el-checkbox>
        <el-button
          v-if="showNewBtn"
          size="small"
          @click="addNewAggregator"
        >
          NEW
        </el-button>
      </el-form-item>
      <el-form-item label="Merchant Name">
        <component
          :is="bindings.componentName"
          v-model="formData.name[bindings.model]"
          :disabled="currentItem && formData.name.selected"
          @input="onValueChange($event, 'name')"
        >
          {{ formData.name.value }}
        </component>
      </el-form-item>
      <el-form-item label="Merchant Image">
        <edit-image
          :current-item="currentItem"
          :image="formData.image"
          @changeValue="onValueChange($event, 'image')"
          @imageLoaded="onImageLoaded"
        />
      </el-form-item>
      <el-form-item
        class="no-divider"
        label="Commission Rate"
      >
        <edit-commission
          :current-item="currentItem"
          :commission="formData.commissionRates"
          @changeValue="onCommissionChange"
        />
      </el-form-item>
      <el-form-item
        class="no-divider"
        label="Commission Type"
      >
        <span :class="{[$style.uneditable]: !currentItem}">
          {{ capitalize(formData.commissionType.value) }}
        </span>
      </el-form-item>
      <el-form-item label="Merchant Tracking URL">
        <el-input
          v-if="currentItem"
          v-model="formData.trackingUrl[bindings.model]"
          @changeValue="onValueChange($event, 'url')"
        />
        <div
          v-else
          :class="$style.uneditable"
        >
          {{ formData.trackingUrl.value }}
        </div>
      </el-form-item>
      <el-form-item label="Classifications">
        <div
          v-if="currentItem"
          :class="$style.classificationsChecks"
        >
          <el-checkbox
            v-for="(item, index) in availableClassifications"
            :key="index"
          >
            {{ item.label }}
          </el-checkbox>
        </div>

        <div
          v-else
          :class="$style.classifications"
        >
          {{ classificationsString }}
        </div>
      </el-form-item>
      <el-form-item label="Summary">
        <component
          :is="bindings.componentName"
          v-model="formData.summary[bindings.model]"
          :disabled="currentItem && formData.summary.selected"
          @input="onValueChange($event, 'summary')"
        >
          {{ formData.summary.value }}
        </component>
      </el-form-item>
      <el-form-item label="Merchant Website">
        <component
          :is="bindings.componentName"
          v-model="formData.website[bindings.model]"
          :disabled="currentItem && formData.website.selected"
          @input="onValueChange($event, 'website')"
        >
          {{ formData.website.value }}
        </component>
      </el-form-item>
      <el-form-item label="Terms & Conditions">
        <component
          :is="bindings.componentName"
          v-model="formData.terms[bindings.model]"
          :disabled="currentItem && formData.terms.selected"
          @input="onValueChange($event, 'terms')"
        >
          {{ formData.terms.value }}
        </component>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" module>
.hiddenLabels {
  :global{
    .el-form-item__label {
      display: none;
    }
  }
}

.editBlock {
  flex-basis: 25%;

  &:not(:last-of-type) {
    padding-right: 1.1rem;
    background-image: linear-gradient(var(--color-primary) 50%, transparent 0%);
    background-repeat: repeat-y;
    background-position: right;
    background-size: .1rem 1rem;
  }

  &:not(:first-of-type) {
    padding-left: 1rem;
  }
}

.currentMerchant {
  min-width: 30rem;
}

.aggrCheckbox {
  margin-right: 0.5rem;
  :global {
    .el-checkbox__label {
      color: #606266 !important;
    }
  }
}

.uneditable {
  padding-left: 2rem;
  overflow: hidden;
  color: gray;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.classificationsChecks {
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;

  :global {
    .el-checkbox {
      flex-basis: 50%;
      padding-bottom: .5rem;
      margin: 0;
    }
  }
}

.classifications {
  min-height: 10rem;
  padding-left: 2rem;
  line-height: 1.5rem;
  color: #606266;
}
</style>
