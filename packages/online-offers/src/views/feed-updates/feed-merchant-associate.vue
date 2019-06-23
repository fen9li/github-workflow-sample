<script>
import get from 'lodash/get'
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        value: '',
        notes: '',
      },
      rules: {},
      search: '',
      selectedItem: null,
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
  methods: {
    ...mapActions('merchants', [
      'searchMerchants',
      'associateMerchant',
    ]),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    async querySearchAsync(queryString, cb) {
      const [, result] = await this.searchMerchants(queryString)
      const items = result && result.items
      if (items) {
        cb(items.map(item => {
          return {
            value: item.name,
            item,
          }
        }))
      }
    },
    handleSelect(item) {
      this.selectedItem = item
    },
    onSubmit() {
      const merchantId = get(this.selectedItem, 'item.id')
      this.associateMerchant({
        merchantId,
        feedmerchantId: this.row.id,
      }).then(() => {
        this.$emit('close-dialog')
        this.updateTable()
      })
    },
    onCreateNew() {
      this.$emit('create-new')
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
    <div>Associate this merchant with an existing global merchant.</div>
    <el-form-item label="Merchant name">
      <el-autocomplete
        v-model="search"
        :fetch-suggestions="querySearchAsync"
        :class="$style.search"
        placeholder="Please input"
        @select="handleSelect"
      />
    </el-form-item>
    <el-form-item
      label="Notes"
      required
    >
      <el-input
        v-model="form.notes"
        type="textarea"
        autosize
        label="Notes"
      />
    </el-form-item>
    <el-alert
      v-if="selectedItem"
      type="warning"
      :class="$style.alert"
      :closable="false"
    >
      You want to associate <b>{{ row.name }}</b> with <b>{{ selectedItem.value }}</b>
    </el-alert>
    <div :class="$style.buttons">
      <el-button
        type="primary"
        plain
        :class="$style.button"
        @click.stop="onCreateNew"
      >
        Create New Merchant
      </el-button>
      <el-button
        type="primary"
        plain
        :class="$style.button"
        :disabled="!selectedItem"
        @click.stop="onSubmit"
      >
        Associate
      </el-button>
    </div>
  </el-form>
</template>

<style lang="scss" module>
.link {
  color: var(--color-primary);
}

.dialog {
  cursor: default;
}

.search {
  width: 100%;
}

.alert {
  margin-bottom: rem(22px);
}

.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}

.button {
  display: block;
  margin: rem(0 10px);
}

</style>
