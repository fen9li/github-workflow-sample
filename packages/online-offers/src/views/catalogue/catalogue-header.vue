<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import CatalogueEditModal from './catalogue-edit-modal.vue'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'CatalogueHeader',
  components: {
    CatalogueEditModal,
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
  <div>
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
              <div :class="$style.formRowValue">
                {{ catalogue.name }}
              </div>
            </div>

            <div :class="$style.formRow">
              <div :class="$style.formRowLabel">
                Aggregator Feeds
              </div>
              <div :class="$style.formRowValue">
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditModal = true"
            />
          </div>
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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

.formInnerRight {
  flex-shrink: 0;
  width: 10rem;
  text-align: right;
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
</style>
