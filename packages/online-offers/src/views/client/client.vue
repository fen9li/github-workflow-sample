<script>
import table from './merchants.table'
import uploadcare from 'uploadcare-vue'

export default {
  name: 'Clients',
  page: {
    title: 'Clients',
  },
  components: {
    uploadcare,
  },
  data() {
    return {
      table: table(this),
      isEdit: false,
      form: {
        clientName: 'Suncorp',
        clientLogo: 'https://s.gravatar.com/avatar/a56e2a3d9b332f51a59e59d5e6516835?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fit.png',
        feeds: ['Rakuten'],
      },
    }
  },
  computed: {
    uploadcareKey() {
      return process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY
    },
  },
  methods: {
    onRowClick(row) {
      this.$router.push({
        name: 'merchant-details',
        params: { slug: row.merchantName || 'unknown' },
      })
    },
    onSuccessUploading(img) {
      this.form.clientLogo = img.cdnUrl
    },
    onSubmit() {
      if (this.isEdit) {
        // send form
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
  },
}
</script>

<template>
  <main-layout
    title="Suncorp"
    back
  >
    <el-card
      body-style="width: 100%"
    >
      <div :class="$style.header">
        <div :class="$style['logo']">
          <img
            :class="$style['logo-image']"
            :src="form.clientLogo"
          >
          <div
            v-if="isEdit"
            :class="$style['logo-change']"
          >
            <uploadcare
              :public-key="uploadcareKey"
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
                  {{ form.clientName }}
                </div>
                <div
                  v-else
                  :class="$style['form-row-field']"
                >
                  <el-input
                    v-model="form.clientName"
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
                    v-if="!!form.feeds.length"
                    :class="$style['client-feeds']"
                  >
                    <span
                      v-for="feed in form.feeds"
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
    </el-card>

    <table-layout
      table-name="merchants"
      :quantity="true"
      :fragments="false"
      :hider="false"
      :processor="table.processor"
      :filters="table.filters"
      :columns="table.columns"
      @row-click="onRowClick"
    >
      <el-table-column
        v-if="false"
        fixed="right"
        width="120"
      >
        <el-button
          type="text"
          :class="$style['view-details-btn']"
        >
          View details
        </el-button>
      </el-table-column>
    </table-layout>
  </main-layout>
</template>

<style lang="scss" module>
  .header {
    display: flex;
  }

  .logo {
    margin-right: 70px;
  }

  .logo-image {
    width: 280px;
    height: 95px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    object-fit: contain;
  }

  .logo-change {
    margin-top: 15px;
    text-align: center;
  }

  .logo-change-btn {
    font-size: 1rem;
  }

  .client-feeds-item {
    display: inline-flex;

    &:not(:last-child) {
      margin-right: 4px;
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
    width: calc(100% - 150px);
  }

  .form-inner-right {
    flex-shrink: 0;
    width: 150px;
    text-align: right;
  }

  .form-row {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  .form-row-label {
    flex-shrink: 0;
    width: 130px;
  }

  .form-row-value, .form-row-field {
    width: calc(100% - 130px);
  }

  .form-row-value {
    padding-left: 75px;
  }

  .form-feeds {
    display: flex;

    :global {
      .el-checkbox {
        margin-right: 0;

        &__label {
          padding-left: 0.5rem;
        }
      }
    }
  }

  .view-details-btn {
    font-weight: 600;
  }
</style>
