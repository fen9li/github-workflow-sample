<script>
import FeaturesMixin from './features.mixin.js'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

/* eslint-disable max-len */
export default {
  name: 'FragmentsManager',
  mixins: [FeaturesMixin],
  data() {
    return {
      storageApiSupported: 'localStorage' in window,
      savedDisplays: null,
      showAddModal: false,
      newDisplayName: '',
      activeDisplay: '',
      skipNextDataWatcher: false,
    }
  },
  computed: {
    dataQuery() {
      return this.processor.dataQuery
    },
    saveButtonDisabled() {
      const { newDisplayName, savedDisplays } = this

      if (!newDisplayName.length) {
        return true
      } else if (savedDisplays && newDisplayName in savedDisplays) {
        return true
      }

      return false
    },
    showNoItems() {
      return this.savedDisplays === null ||
        !Object.keys(this.savedDisplays).length
    },
  },
  watch: {
    'dataQuery': {
      handler(newVal) {
        const currentDisplay = this.savedDisplays[this.activeDisplay]

        if (
          !this.skipNextDataWatcher &&
          !isEqual(newVal, currentDisplay)
        ) {
          this.activeDisplay = ''
        }

        this.skipNextDataWatcher = false
      },
      deep: true,
    },
    activeDisplay(newVal) {
      if (newVal) {
        const { processor } = this

        processor.dataQuery = cloneDeep(this.savedDisplays[newVal])
        processor.getData({ shouldUpdateURL: true })
      }
    },
  },
  created() {
    if (this.storageApiSupported) {
      this.savedDisplays = this.getAllDisplays()
    }
  },
  methods: {
    getAllDisplays() {
      const savedDisplays = localStorage.getItem('savedDisplays')

      try {
        return JSON.parse(savedDisplays)
      } catch (e) {
        return null
      }
    },
    saveDisplay() {
      const { newDisplayName, dataQuery } = this
      const displays = this.getAllDisplays() || {}

      displays[newDisplayName] = cloneDeep(dataQuery)

      this.showAddModal = false
      this.newDisplayName = ''
      this.savedDisplays = displays

      localStorage.setItem('savedDisplays', JSON.stringify(displays))
    },
    removeDisplay(displayName) {
      const { savedDisplays, activeDisplay } = this

      this.$delete(savedDisplays, displayName)

      if (displayName === activeDisplay) {
        this.activeDisplay = ''
      }

      localStorage.setItem('savedDisplays', JSON.stringify(savedDisplays))
    },
  },
}
</script>

<template>
  <div class="fragments">
    <el-dialog
      ref="dialog"
      :visible.sync="showAddModal"
      center
      title="Save new display"
      width="25%"
      top="30vh"
      custom-class="fragments__dialog"
    >
      <el-input
        v-model="newDisplayName"
        placeholder="Display name"
      />
      <el-button
        :disabled="saveButtonDisabled"
        type="primary"
        class="fragments__dialog-save"
        @click="saveDisplay"
      >
        Save
      </el-button>
    </el-dialog>
    <div
      v-if="showNoItems"
      class="fragments__no-items"
    >
      <el-button
        :disabled="!storageApiSupported || !dataQuery"
        :title="!storageApiSupported ? 'Not supported by your browser': ''"
        type="text"
        class="fragments__trigger"
        @click="showAddModal = true"
      >
        Save this display
      </el-button>
    </div>
    <div
      v-else
      class="fragments__saved"
    >
      <el-dropdown trigger="click">
        <el-button size="small">
          Displays saved
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          class="fragments__saved-dropdown"
        >
          <div
            class="fragments__saved-create"
            @click="showAddModal = true"
          >
            <i
              class="el-icon-circle-plus-outline fragments__saved-create-icon"
            />
            Create new
          </div>
          <el-radio-group
            v-model="activeDisplay"
            size="mini"
          >
            <div
              v-for="(_, displayName) in savedDisplays"
              :key="displayName"
              class="fragments__item"
            >
              <el-radio
                :label="displayName"
                class="fragments__item-radio"
              >
                {{ displayName }}
              </el-radio>
              <i
                class="el-icon-close fragments__item-delete"
                @click="removeDisplay(displayName)"
              />
            </div>
          </el-radio-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss">
  .fragments {
    margin-left: 15px;

    &__dialog {
      padding: 25px;

      &-save {
        width: 100%;
        margin-top: 20px !important;
      }
    }

    &__saved {
      &-dropdown {
        padding: 15px 25px !important;

        .el-radio-group {
          width: 100%;
        }
      }

      &-create {
        padding-top: 10px;
        padding-bottom: 10px;
        color: #606266;
        cursor: pointer;
        transition: color 0.15s ease-in-out;

        &:hover {
          color: #409eff;
        }

        &-icon {
          margin-right: 8px;
          margin-left: -1px;
        }
      }
    }

    &__item {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 10px;

      &-radio {
        width: 100%;
        margin-right: 0 !important;

        .el-radio__label {
          font-size: 16px !important;
        }

        .el-radio__inner {
          width: 16px;
          height: 16px;
        }
      }

      &-delete {
        font-size: 18px;
        cursor: pointer;
        transition: color 0.15s ease-in-out;

        &:hover {
          color: #409eff;
        }
      }
    }

    &__trigger {
      font-size: 16px;
    }
  }
</style>
