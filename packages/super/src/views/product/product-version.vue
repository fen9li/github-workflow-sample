<script>
import { mapActions } from 'vuex'
import capitalize from 'lodash/capitalize'
import { formatDate } from '@lib/utils/format-date'
import CreateVersionModal from './modals/create-version-modal.vue'
import DeleteVersionModal from './modals/delete-version-modal.vue'

import VersionMock from './version.mock.js'

export default {
  name: 'ProductVersion',
  components: {
    CreateVersionModal,
    DeleteVersionModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    versionId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      version: null,
      loading: true,
      modal: {
        edit: false,
        delete: false,
      }
    }
  },
  computed: {
    backRoute() {
      return {
        name: 'product-details',
        params: {
          id: this.id,
          activeTab: 'versions',
        },
      }
    },
    status() {
      return capitalize(this.version.status || '')
    },
  },
  async created() {
    this.loadVersion()
  },
  methods: {
    ...mapActions('version', ['getVersion']),
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
    async loadVersion() {
      this.loading = true

      try {
        // this.version = await this.getProduct({
        //   productId: this.id,
        //   versionId: this.versionId,
        // })
        this.version = VersionMock
      } catch (e) {
        this.$router.replace(this.backRoute)
        console.error(e)
      }

      this.loading = false
    }
  },
}
</script>

<template>
  <main-layout
    title="Version Details"
    :back="backRoute"
  >
    <el-card :class="$style.card">
      <dl :class="['datalist', $style.list]">
        <dt>Date Created</dt>
        <dd>{{ formatDate(version.createdAt) }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(version.updatedAt) }}</dd>

        <dt>Version ID</dt>
        <dd>{{ version.id }}</dd>

        <dt>Version Name</dt>
        <dd>{{ version.name }}</dd>

        <dt>Version Description</dt>
        <dd>{{ version.description }}</dd>

        <dt>Product</dt>
        <dd>{{ version.product.name }}</dd>

        <dt>Version Status</dt>
        <dd>
          <div :class="[$style.status, $style[`status${status}`]]">
            <el-icon
              :name="status === 'active' ? 'check' : 'close'"
              :class="$style.statusIcon"
            />
            <span>{{ status }}</span>
          </div>
        </dd>

        <dt>Latest Version</dt>
        <dd>
          <i
            v-if="version.latest"
            :class="['el-icon-check', $style.statusActive]"
          />
          <i
            v-else
            :class="['el-icon-close', $style.statusInactive]"
          />
        </dd>
      </dl>
      <el-dropdown trigger="click">
        <div :class="$style.drop">
          <i class="el-icon-more" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="modal.edit = true">
            Edit Version
          </el-dropdown-item>
          <el-dropdown-item @click.native="modal.delete = true">
            Delete Version
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-card>

    <delete-version-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
      @close-modal="modal.delete = false"
      @refresh-table="$router.push(backRoute)"
    />
    <create-version-modal
      v-if="modal.edit"
      :product="version.product"
      :visible.sync="modal.edit"
      :version="version"
      is-edit
      @close-modal="modal.edit = false"
      @refresh-table="loadVersion"
    />
  </main-layout>
</template>

<style lang="scss" module>
.card :global(.el-card__body) {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.drop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  font-size: 1rem;
  color: var(--color-primary-lightest);
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-transparent);
  }
}

.list {
  flex: 1 0 50%;
  margin-top: 0;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}

.status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  font-size: 1rem;
}

.statusActive {
  color: #36d544;
}

.statusInactive {
  color: #e21d1f;
}

.statusIcon {
  margin-top: 2px;
  margin-right: rem(10px);
}
</style>
