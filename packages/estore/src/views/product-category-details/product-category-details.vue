<script>
import { mapActions } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import DeleteCategoryModal from './modals/delete-category.modal'
import HeaderDropdown from '~/components/header-dropdown'

import CategoryMock from './category.mock.js'

export default {
  name: 'ProductCategoryDetails',
  components: {
    DeleteCategoryModal,
    HeaderDropdown,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      category: CategoryMock,
      modals: {
        delete: false,
      },
      backRoute: { name: 'product-categories' },
      dropdownItems: [
        {
          label: 'Edit Default Product Category Supplier',
          action: this.onEditClick,
        },
        {
          label: 'Delete Default Product Category',
          action: () => { this.modals.delete = true },
        },
      ],
    }
  },
  async created() {
    this.loading = true

    // const [err, response] = await this.getCategory(this.id)
    //
    // if (err) {
    //   this.$router.replace(this.backRoute)
    // } else {
    //   this.category = response
    // }

    this.loading = false
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    onEditClick() {
      this.$router.push({ name: 'product-hierarchy', id: this.id })
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
  },
}
</script>

<template>
  <main-layout
    title="Category"
    :back="backRoute"
    :loading="loading"
  >
    <header-dropdown
      slot="header"
      :items="dropdownItems"
    />

    <data-box header="Category Details">
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(category.created_at) || '-' }}</dd>

        <dt>Group</dt>
        <dd>{{ category.group }}</dd>

        <dt>Tiers</dt>
        <dd v-if="category.tiers.length">
          <data-list
            v-for="tier in category.tiers"
            :key="tier.name"
            :class="$style.group"
          >
            <dt>{{ tier.name }}</dt><dd />
            <dt :class="$style.noBold">
              Categories
            </dt>

            <template v-if="tier.categories.length">
              <template v-for="(cat, index) in tier.categories">
                <dt
                  v-if="index > 0"
                  :key="cat"
                />
                <dd :key="cat + index">
                  {{ cat }}
                </dd>
              </template>
            </template>

            <dd v-else>
              -
            </dd>
          </data-list>
        </dd>
        <dd v-else>
          '-'
        </dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(category.updated_at) || '-' }}</dd>
      </data-list>
    </data-box>

    <delete-category-modal
      v-if="modals.delete"
      :visible.sync="modals.delete"
      :category="category"
    />
  </main-layout>
</template>

<style lang="scss" module>
.noBold {
  font-weight: normal;
}

.group {
  margin-bottom: 1rem;
}
</style>
