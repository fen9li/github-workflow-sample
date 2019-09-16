<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import CatalogueEditModal from './catalogue-edit-modal.vue'
import CatalogueStatusModal from './catalogue-status-modal'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'CatalogueHeader',
  components: {
    CatalogueEditModal,
    CatalogueStatusModal
  },
  props: {
    catalogue: {
      type: Object,
      default: () => {},
    },
    processor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      form: {},
      showEditModal: false,
      showDisableModal: false,
    }
  },
  computed: {
    feeds() {
      return get(this.catalogue, 'feeds', []).map(item => item.name)
    },
  },
  async created() {
    const [, result] = await this.getMerchantFromCatalogue(this.$route.params.id)
    if (result) {
      this.form = result
    }
  },
  methods: {
    ...mapActions('catalogues', ['getMerchantFromCatalogue']),
    cataloguesUpdated() {
      this.$emit('catalogues-updated')
      this.showEditModal = false
    },
  },
}
</script>

<template>
  <div data-test="catalogue-header">
    <div :class="$style.header">
      <div :class="$style.logo">
        <img
          :class="$style.logoImage"
          :src="catalogue.logo"
        >
      </div>

      <div :class="$style.form">
        <div :class="$style.formInner">
          <div :class="$style.formInnerLeft">
            <div :class="$style.formRow">
              <div :class="$style.formRowLabel">
                Client Name
              </div>
              <div :class="[$style.formRowValue, {[$style.disabled]: !catalogue.enabled}]">
                {{ catalogue.name }}
              </div>
            </div>

            <div :class="$style.formRow">
              <div :class="$style.formRowLabel">
                Aggregator Feeds
              </div>
              <div :class="[$style.formRowValue, {[$style.disabled]: !catalogue.enabled}]">
                <div
                  v-if="!!feeds.length"
                  :class="$style.catalogueFeeds"
                >
                  {{ feeds.join(', ') }}
                </div>

                <div
                  v-else
                  :class="$style.catalogueFeeds"
                >
                  <span :class="$style.catalogueFeedsItem">
                    There are no feeds
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div :class="$style.formInnerRight">
            <div :class="$style.formInnerRightBtns">
              <el-button
                v-if="catalogue.enabled"
                type="danger"
                @click="showDisableModal = true"
              >
                Disable Client
              </el-button>
              <el-button
                v-else
                type="success"
                @click="showDisableModal = true"
              >
                Enable Client
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                data-test="edit"
                @click="showEditModal = true"
              >
                Edit Client
              </el-button>
            </div>
            <catalogue-status-modal
              :id="catalogue.id"
              :status="catalogue.enabled"
              :visible.sync="showDisableModal"
              @catalogues-updated="cataloguesUpdated"
            />
            <catalogue-edit-modal
              :visible.sync="showEditModal"
              :processor="processor"
              :catalogue="catalogue"
              modal-append-to-body
              append-to-body
              @catalogues-updated="cataloguesUpdated"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.header {
  display: flex;
  padding: var(--size-card-spacing);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: rem(200px);
  margin-right: 5rem;

  img {
    display: block;
    max-width: 100%;
  }
}

.logoImage {
  width: auto;
  max-width: 20rem;
  height: auto;
  max-height: 7rem;
  object-fit: contain;
}

.form {
  display: flex;
  width: 100%;
}

.formInner {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.formInnerLeft {
  width: calc(100% - 10rem);
}

.formInnerRightBtns {
  display: flex;
  width: 100%;
}

.formRow {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
}

.formRowLabel {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: flex-start;
  width: 8rem;
  height: 2.5rem;
}

.formRowValue,
.formRowField {
  width: calc(100% - 8rem);
}

.formRowValue {
  padding-left: 75px;
  font-weight: bold;
}

.formFeeds {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.6rem;

  :global {
    .el-checkbox {
      margin: 0 0.6rem 0.6rem 0 !important;

      &__label {
        padding-left: 0.5rem;
      }
    }
  }
}

.disabled {
  color: #909399;
}
</style>
