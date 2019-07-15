
<script>
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'OfferUpdateModal',
  inheritAttrs: false,
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        notes: '',
      },
    }
  },
  computed: {
    changedFields() {
      return this.fields.filter(el => el.changed)
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        this.$emit('submit', this.form.notes)
      })
    },
    updateLabel(item) {
      const { key, value } = item
      switch (key) {
        case 'end_date':
        case 'start_date':
          return formatDate(value, 'DD/MM/YYYY hh:mm A', false)
        default:
          return value
      }
    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    title="Update Offer"
    :class="$style.dialog"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="100%"
      label-position="top"
      :class="$style.root"
    >
      <p :class="$style.text">
        Are you sure you wish to update these details?
      </p>
      <el-form-item
        v-for="(item, index) in changedFields"
        :key="index"
        :label="item.label"
      >
        <span :class="$style.changed">
          {{ updateLabel(item) }}
        </span>
      </el-form-item>
      <!-- <el-form-item
        label="Notes"
        prop="notes"
        required
        :class="$style.textarea"
      >
        <el-input
          v-model="form.notes"
          type="textarea"
          :rows="4"
        />
      </el-form-item> -->
      <el-button
        type="primary"
        class="el-button--wide"
        :class="$style.submit"
        @click="submit"
      >
        Update
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.dialog {
  :global {
    .el-dialog__header {
      padding-right: rem(40px);
      padding-left: rem(40px);
      text-align: left;
    }

    .el-form-item__content {
      min-height: unset;
    }
  }
}

.root {
  display: flex;
  flex-direction: column;
}

.text {
  margin: rem(0 0 22px 0);
  font-size: 1rem;
  line-height: 1.5;
}

.changed {
  max-height: rem(200px);
  overflow-y: auto;
  line-height: normal;
  color: var(--color-dark-gray);
}

.textarea {
  width: 100%;
}

.submit {
  margin: 2rem auto 0;
}
</style>
