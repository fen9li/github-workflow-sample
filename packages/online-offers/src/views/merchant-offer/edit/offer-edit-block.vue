<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'MerchantOfferEditBlock',
  props: {
    details: {
      type: Object,
      required: true,
    },
    currentItem: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      allSelected: false,
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
    addNewAggregator() {

    },
    onValueChange(value, field) {
      this.$emit('valueChange', {
        apply: value,
        newValue: this.formData[field].value,
        field,
      })
    },
    changeAllValues(value) {
      const { formData } = this
      this.allSelected = !this.allSelected
      for (const item in formData) {
        if (formData.hasOwnProperty(item)) {
          formData[item].selected = this.allSelected
        }
      }
      this.$emit('valueChange', {
        newValue: formData,
        apply: value,
        field: 'all',
      })
    },
  },
}
</script>

<template>
  <div :class="$style.editBlock">
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
          :class="$style.aggrCheckbox"
          @change="changeAllValues"
        >
          {{ formData.feed.value }}
        </el-checkbox>
        <el-button
          size="small"
          @click="addNewAggregator"
        >
          NEW
        </el-button>
      </el-form-item>
      <el-form-item label="Offer Name">
        <component
          :is="bindings.componentName"
          v-model="formData.name[bindings.model]"
          :disabled="currentItem && formData.name.selected"
          @input="onValueChange($event, 'name')"
        >
          {{ formData.name.value }}
        </component>
      </el-form-item>
      <el-form-item label="Coupon Code">
        <component
          :is="bindings.componentName"
          v-model="formData.coupon[bindings.model]"
          :disabled="currentItem && formData.coupon.selected"
          @input="onValueChange($event, 'coupon')"
        >
          {{ formData.coupon.value }}
        </component>
      </el-form-item>
      <el-form-item label="Offer Starts">
        <component
          :is="bindings.componentName"
          v-model="formData.offerStarts[bindings.model]"
          :disabled="currentItem && formData.offerStarts.selected"
          @input="onValueChange($event, 'offerStarts')"
        >
          {{ formData.offerStarts.value }}
        </component>
      </el-form-item>
      <el-form-item label="Offer Ends">
        <component
          :is="bindings.componentName"
          v-model="formData.offerEnds[bindings.model]"
          :disabled="currentItem && formData.offerEnds.selected"
          @input="onValueChange($event, 'offerEnds')"
        >
          {{ formData.offerEnds.value }}
        </component>
      </el-form-item>
      <el-form-item label="Description">
        <component
          :is="bindings.componentName"
          v-model="formData.description[bindings.model]"
          :disabled="currentItem && formData.description.selected"
          @input="onValueChange($event, 'description')"
        >
          {{ formData.description.value }}
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
      <el-form-item label="URL">
        <component
          :is="bindings.componentName"
          v-model="formData.url[bindings.model]"
          :disabled="currentItem && formData.url.selected"
          @input="onValueChange($event, 'url')"
        >
          {{ formData.url.value }}
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
  flex-basis: 50%;

  &:not(:last-of-type) {
    padding-right: 5rem;
    background-image: linear-gradient(var(--color-primary) 50%, transparent 0%);
    background-repeat: repeat-y;
    background-position: right;
    background-size: .1rem 1rem;
  }

  &:not(:first-of-type) {
    padding-left: 5rem;
  }
}

.aggrCheckbox {
  margin-right: 0.5rem;
  :global {
    .el-checkbox__label {
      color: #606266 !important;
    }
  }
}

</style>
