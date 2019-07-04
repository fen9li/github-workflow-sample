<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import ClientEditModal from './client-edit-modal.vue'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'ClientHeader',
  components: {
    ClientEditModal,
  },
  props: {
    client: {
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
      return get(this.client, 'feeds', []).map(item => item.name)
    },
  },
  async created() {
    this.form = await this.getMerchant(this.$route.params.id)
  },
  methods: {
    ...mapActions('catalogues', ['getMerchant']),
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
          :class="$style['logo-image']"
          :src="client.logo"
        >
      </div>

      <div :class="$style.form">
        <div :class="$style['form-inner']">
          <div :class="$style['form-inner-left']">
            <div :class="$style['form-row']">
              <div :class="$style['form-row-label']">
                Client Name
              </div>
              <div :class="$style['form-row-value']">
                {{ client.name }}
              </div>
            </div>

            <div :class="$style['form-row']">
              <div :class="$style['form-row-label']">
                Aggregators
              </div>
              <div :class="$style['form-row-value']">
                <div
                  v-if="!!feeds.length"
                  :class="$style['client-feeds']"
                >
                  {{ feeds.join(', ') }}
                </div>

                <div
                  v-else
                  :class="$style['client-feeds']"
                >
                  <span :class="$style['client-feeds-item']">
                    There are no feeds
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div :class="$style['form-inner-right']">
            <el-button
              type="primary"
              @click="showEditModal = true"
            >
              {{ 'Edit Client' }}
            </el-button>
          </div>
          <client-edit-modal
            :visible.sync="showEditModal"
            :processor="processor"
            :client="client"
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

.logo-image {
  width: auto;
  max-width: 20rem;
  height: auto;
  max-height: 7rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.logo-change {
  margin: 1.5rem 0 -1rem;
  text-align: center;
}

.logo-change-btn {
  padding: 0;
  font-size: 1rem;
}

.uploader {
  display: flex;
  width: 100%;
  padding-left: rem(15px);
  border: rem(1px) solid #dcdfe6;
  border-radius: rem(4px);
}

.uploadcare {
  order: 2;
}

.uploadButton {
  height: 100%;
  background-color: #dcdfe6;
  border-width: 0 0 0 1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover {
    border-color: #dcdfe6 !important;
  }
}

.form {
  display: flex;
  width: 100%;
}

.form-inner {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-inner-left {
  width: calc(100% - 10rem);
}

.form-inner-right {
  flex-shrink: 0;
  width: 10rem;
  text-align: right;
}

.form-row {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 2.5rem;
}

.form-row-label {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: flex-start;
  width: 8rem;
  height: 2.5rem;
}

.form-row-value,
.form-row-field {
  width: calc(100% - 8rem);
}

.form-row-value {
  padding-left: 75px;
}

.form-feeds {
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
