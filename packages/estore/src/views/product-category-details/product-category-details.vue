<script>
import { mapActions } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import DeleteCategoryModal from './modals/delete-category.modal'

import CategoryMock from './category.mock.js'

export default {
  name: 'ProductCategoryDetails',
  components: {
    DeleteCategoryModal,
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
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="onEditClick">
          Edit Default Product Category
        </el-dropdown-item>
        <el-dropdown-item @click.native="modals.delete = true">
          Delete Default Product Category
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
.drop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-primary-lightest);
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-transparent);
  }

  i {
    transform: rotate(90deg);
  }
}

.noBold {
  font-weight: normal;
}

.group {
  margin-bottom: 1rem;
}
</style>
