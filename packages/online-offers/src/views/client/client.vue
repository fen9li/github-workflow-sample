<script>
import table from './merchants.table'
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import ApiProcessor from '@lib/processors/api-processor'
import { mapActions } from 'vuex'
import get from 'lodash/get'
import LinkModal from './link-modal'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    uploadcare,
    LinkModal,
  },
  data() {
    return {
      table: table(this),
      isEdit: false,
      form: {},
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
      client: null,
      activeTab: 'linked',
      selectedItems: [],
    }
  },
  computed: {
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
    path() {
      const catalogueId = this.$route.params.id
      return `/catalogues/${catalogueId}/merchants`
    },
    feeds() {
      return get(this.form, 'feeds', []).map(item => item.name)
    },
  },
  async created() {
    this.activeTab = this.$route.params.tab || 'linked'
    this.getMerchantOffers()
    this.form = await this.getMerchant(this.$route.params.id)
  },
  methods: {
    ...mapActions('catalog', ['getMerchant']),
    getMerchantOffers() {
      this.table.processor = new ApiProcessor({
        component: this,
        path: this.path,
      })
    },
    onBackClick() {
      this.$router.push({ name: 'clients' })
    },
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-details',
        params: { slug: row.merchantName || 'unknown' },
      })
    },
    onSuccessUploading(img) {
      this.form.logo = img.cdnUrl
    },
    onSubmit() {
      if (this.isEdit) {
        // send form
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    onTabClick() {
      this.$router.push({
        name: 'client-details',
        params: {
          id: this.$route.params.id,
          tab: this.activeTab === 'linked' ? null : this.activeTab,
        },
        query: {},
      })
      this.getMerchantOffers()
    },
    handleSelectionChange(value) {
      this.selectedItems = value
    },
    unlink() {},
    link() {},
  },
}
</script>

<template>
  <main-layout
    title="Suncorp"
  >
    <el-button
      slot="beforeTitle"
      :class="$style.backButton"
      circle
      icon="el-icon-arrow-left"
      @click="onBackClick"
    />
    <el-card
      :class="$style.card"
      body-style="padding: 0"
    >
      <div :class="$style.header">
        <div :class="$style.logo">
          <img
            :class="$style['logo-image']"
            :src="form.logo"
          >
          <div
            v-if="isEdit"
            :class="$style['logo-change']"
          >
            <uploadcare
              :public-key="uploadcare.publicKey"
              :secure-signature="uploadcareSignature"
              :secure-expire="uploadcare.expire"
              crop="160x60"
              @success="onSuccessUploading"
            >
              <el-button
                type="text"
                :class="$style['logo-change-btn']"
              >
                Change Image
              </el-button>
            </uploadcare>
          </div>
        </div>

        <div :class="$style.form">
          <div :class="$style['form-inner']">
            <div :class="$style['form-inner-left']">
              <div :class="$style['form-row']">
                <div :class="$style['form-row-label']">
                  Client Name
                </div>
                <div
                  v-if="!isEdit"
                  :class="$style['form-row-value']"
                >
                  {{ form.name }}
                </div>
                <div
                  v-else
                  :class="$style['form-row-field']"
                >
                  <el-input
                    v-model="form.name"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div :class="$style['form-row']">
                <div :class="$style['form-row-label']">
                  Aggregators
                </div>
                <div
                  v-if="!isEdit"
                  :class="$style['form-row-value']"
                >
                  <div
                    v-if="!!feeds.length"
                    :class="$style['client-feeds']"
                  >
                    <span
                      v-for="feed in feeds"
                      :key="feed"
                      :class="$style['client-feeds-item']"
                    >
                      {{ feed }}
                    </span>
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
                <div
                  v-else
                  :class="$style['form-row-field']"
                >
                  <el-checkbox-group
                    v-model="form.feeds"
                  >
                    <div :class="$style['form-feeds']">
                      <el-checkbox
                        label="Commission Factory"
                        border
                      />
                      <el-checkbox
                        label="Rakuten"
                        border
                      />
                      <el-checkbox
                        label="APD"
                        border
                      />
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </div>

            <div :class="$style['form-inner-right']">
              <el-button
                type="primary"
                @click="onSubmit"
              >
                {{ isEdit ? 'Save Changes' : 'Edit Client' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <pre>{{ client }}</pre>

      <el-tabs
        v-model="activeTab"
        :class="$style.tabs"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          label="Linked"
          name="linked"
        >
          <table-layout
            :class="$style.table"
            shadow="never"
            table-name="clients-details"
            :processor="table.processor"
            :filters="table[activeTab].filters"
            :columns="table[activeTab].columns"
            :fragments="false"
            :hider="false"
            quantity
            @row-click="onRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              fixed="left"
              width="55"
            />
          </table-layout>
          <div :class="$style.buttonWrapper">
            <el-button
              type="primary"
              :disabled="!selectedItems.length"
              @click="unlink"
            >
              Unlink
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="Unlinked"
          name="unlinked"
        >
          <table-layout
            :class="$style.table"
            shadow="never"
            table-name="clients-details"
            :processor="table.processor"
            :filters="table[activeTab].filters"
            :columns="table[activeTab].columns"
            :fragments="false"
            :hider="false"
            quantity
            @row-click="onRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              fixed="left"
              width="55"
            />
          </table-layout>
          <link-modal
            :items="selectedItems"
            :name="form.name"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
  .header {
    display: flex;
    padding: var(--size-card-spacing);
  }

  .backButton {
    position: absolute;
    left: 0;
    padding: .2rem !important;
    border-color: var(--color-primary);
    border-width: 2px;

    i {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--color-primary);
    }
  }

  .card {
    width: 100%;
    margin: 0 0 1.25rem;
  }

  .logo {
    margin-right: 5rem;
  }

  .table {
    padding: 0;
    margin-bottom: rem(16px);
    border: none;
    box-shadow: none !important;
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

  .client-feeds-item {
    display: inline-flex;

    &:not(:last-child) {
      margin-right: .25rem;
      &:after {
        content: ',';
      }
    }
  }

  .form {
    display: flex;
    width: 100%;
  }

  .form-inner {
    display: flex;
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

  .form-row-value, .form-row-field {
    width: calc(100% - 8rem);
  }

  .form-row-value {
    padding-left: 75px;
  }

  .form-feeds {
    display: flex;
    flex-wrap: wrap;
    margin-top: .6rem;

    :global {
      .el-checkbox {
        margin: 0 .6rem .6rem 0 !important;

        &__label {
          padding-left: .5rem;
        }
      }
    }
  }

  .view-details-btn {
    font-weight: 600;
  }

  .tabs {
    :global {
      .el-tabs__header {
        padding: 0 var(--size-card-spacing) calc(var(--size-card-spacing) / 2);
      }
    }
  }

  .checkbox {
    :global {
      .el-checkbox__label {
        display: none;
      }
    }
  }

  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: rem(0 48px 16px 0);
  }
</style>
