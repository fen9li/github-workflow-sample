<script>
import FeaturesMixin from './features.mixin.js'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

/* eslint-disable max-len */
export default {
  name: 'FragmentsManager',
  mixins: [FeaturesMixin],
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
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

      if (
        !newDisplayName.length ||
        (savedDisplays && newDisplayName in savedDisplays)
      ) {
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
        const { savedDisplays } = this

        if (!savedDisplays) {
          return
        }

        const currentDisplay = savedDisplays[this.activeDisplay]

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
        const parsed = JSON.parse(savedDisplays)
        let displays = null

        if (parsed !== null) {
          displays = parsed[this.tableName] || null
        }

        return displays
      } catch (e) {
        console.error(e)

        return null
      }
    },
    saveDisplay() {
      const { newDisplayName, dataQuery, tableName } = this
      const displays = this.getAllDisplays() || {}

      displays[newDisplayName] = cloneDeep(dataQuery)

      this.showAddModal = false
      this.newDisplayName = ''
      this.savedDisplays = displays

      localStorage.setItem('savedDisplays', JSON.stringify({ [tableName]: displays }))
    },
    removeDisplay(displayName) {
      const { savedDisplays, activeDisplay, tableName } = this

      this.$delete(savedDisplays, displayName)

      if (displayName === activeDisplay) {
        this.activeDisplay = ''
      }

      localStorage.setItem('savedDisplays', JSON.stringify({ [tableName]: savedDisplays }))
    },
  },
}
</script>

<template>
  <div :class="$style.wrap">
    <el-dialog
      ref="dialog"
      center
      title="Save new display"
      :visible.sync="showAddModal"
      width="25%"
      top="30vh"
    >
      <el-input
        v-model="newDisplayName"
        placeholder="Display name"
      />
      <el-button
        type="primary"
        :class="$style.save"
        :disabled="saveButtonDisabled"
        @click="saveDisplay"
      >
        Save
      </el-button>
    </el-dialog>
    <div v-if="showNoItems">
      <el-button
        type="text"
        :disabled="!storageApiSupported || !dataQuery"
        :title="!storageApiSupported ? 'Not supported by your browser': ''"
        :class="$style.trigger"
        @click="showAddModal = true"
      >
        Save this display
      </el-button>
    </div>
    <div v-else>
      <el-dropdown trigger="click">
        <el-button size="small">
          Displays saved
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          :class="$style.savedDrop"
        >
          <div
            :class="$style.create"
            @click="showAddModal = true"
          >
            <i
              :class="['el-icon-circle-plus-outline', $style.createIcon]"
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
              :class="$style.item"
            >
              <el-radio
                :label="displayName"
                :class="$style.itemRadio"
              >
                {{ displayName }}
              </el-radio>
              <i
                :class="['el-icon-close', $style.delete]"
                @click="removeDisplay(displayName)"
              />
            </div>
          </el-radio-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: 1rem;
}

.save {
  width: 100%;
  margin-top: 1.2rem !important;
}

.trigger {
  font-size: 1rem;
}

.savedDrop {
  padding: 1rem 1.5rem !important;

  :global {
    .el-radio-group {
      width: 100%;
    }
  }
}

.create {
  padding-top: .6rem;
  padding-bottom: .6rem;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color .15s ease-in-out;

  &:hover {
    color: var(--color-primary-lightest);
  }
}

.createIcon {
  margin-right: .5rem;
}

.item {
  display: flex;
  justify-content: space-between;
  padding-top: .6rem;
  padding-bottom: .6rem;
}

.itemRadio {
  width: 100%;
  margin-right: 0 !important;

  :global {
    .el-radio__label {
      font-size: 1rem !important;
    }

    .el-radio__inner {
      width: 1rem;
      height: 1rem;
    }
  }
}

.delete {
  font-size: 1.1rem;
  cursor: pointer;
  transition: color .15s ease-in-out;

  &:hover {
    color: var(--color-primary-lightest);
  }
}

</style>
