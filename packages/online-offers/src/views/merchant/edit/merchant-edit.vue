<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import MerchantRemoveModal from './modals/merchant-remove'
import MerchandUpdateModal from './modals/merchant-update'
import EditLayout from '../../../components/edit-layout/edit-layout'

export default {
  name: 'MerchantDetailsEdit',
  components: {
    EditLayout,
    MerchantRemoveModal,
    MerchandUpdateModal,
  },
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modals: {
        remove: false,
        update: false,
      },
      fields: [
        {
          key: 'name',
          label: 'Merchant name',
          path: 'merchant.name',
          component: 'el-input',
          rules: [
            { required: true, message: 'merchant name is required' },
          ],
        }, {
          key: 'logo',
          label: 'Merchant Image',
          path: 'merchant.logo',
          component: 'edit-layout-image',
          rules: [
            { required: true, message: 'merchant logo is required' },
          ],
        }, {
          key: 'summary',
          label: 'Summary',
          path: 'merchant.summary',
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        }, {
          key: 'website',
          label: 'Merchant Website',
          path: 'merchant.website',
          rules: [
            { required: true, message: 'website url is required' },
          ],
          component: 'el-input',
          componentSlots: [
            {
              name: 'prepend',
              value: 'http://',
            },
          ],
        }, {
          key: 'categories',
          label: 'Classification',
          path: 'merchant.categories',
          rules: [
            { required: true, message: 'classification is required' },
          ],
          component: 'edit-layout-categories',
          componentBindings: {
            categories: get(this.details, 'map.categories', []),
          },
        }, {
          key: 'terms',
          label: 'Terms & Conditions',
          path: 'merchant.terms',
          rules: [
            { required: true, message: 'terms is required' },
          ],
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        }, {
          type: 'divider',
          slot: 'footerTitle',
        }, {
          key: 'commission',
          label: 'Commission Rate',
          path: 'merchant.commission',
          component: 'edit-layout-table',
          componentBindings: {
            labels: {
              base: 'Base',
              min: 'Min',
              max: 'Max',
              type: 'Commission Type',
              url: 'Merchant Tracking URL',
            },
            values: [
              {
                key: 'commission_factory',
                items: {
                  base: {
                    value: 2,
                    format: value => `$${ value }`,
                  },
                  min: {
                    value: 3,
                    format: value => `$${ value }`,
                  },
                  max: {
                    value: 4,
                    format: value => `$${ value }`,
                  },
                  type: {
                    value: 'DOLLARS',
                    format: this.formatType,
                  },
                  url: {
                    value: 'www.test.com',
                  },
                },
              }, {
                key: 'rakuten',
                items: {
                  base: {
                    value: get(this.details, 'map.commission.base', 0),
                    format: value => `${ value }%`,
                  },
                  min: {
                    value: get(this.details, 'map.commission.min', 0),
                    format: value => `${ value }%`,
                  },
                  max: {
                    value: get(this.details, 'map.commission.max', 0),
                    format: value => `${ value }%`,
                  },
                  type: {
                    value: get(this.details, 'map.commission.type', 'PERCENTAGE'),
                    format: this.formatType,
                  },
                  url: {
                    value: 'www.test.net',
                  },
                },
              },
            ],
          },
        },
      ],
      feedOffers: [{
        title: get(this.details, 'map.feed', ''),
        selected: false,
        items: {
          name: {
            selected: false,
            value: get(this.details, 'map.name', '-'),
          },
          website: {
            selected: false,
            value: get(this.details, 'map.website', '-'),
          },
          logo: {
            selected: false,
            value: get(this.details, 'map.logo', '-'),
            preview: 'image',
          },
          summary: {
            selected: false,
            value: get(this.details, 'map.summary', '-'),
          },
          categories: {
            selected: false,
            value: get(this.details, 'map.categories', []),
            label: get(this.details, 'map.categories', []).map(el => el.label).join(', '),
          },
          terms: {
            selected: false,
            value: get(this.details, 'map.terms', '-'),
          },
          commission: {
            selected: true,
            type: 'radio',
            value: get(this.details, 'map.feed', ''),
            component: 'edit-layout-table',
            componentBindings: {
              labels: {
                base: 'Base',
                min: 'Min',
                max: 'Max',
                type: 'Commission Type',
                url: 'Merchant Tracking URL',
              },
              values: [
                {
                  key: 'commission_factory',
                  items: {
                    base: {
                      value: 2,
                      format: value => `$${ value }`,
                    },
                    min: {
                      value: 3,
                      format: value => `$${ value }`,
                    },
                    max: {
                      value: 4,
                      format: value => `$${ value }`,
                    },
                    type: {
                      value: 'DOLLARS',
                      format: this.formatType,
                    },
                    url: {
                      value: 'www.test.com',
                    },
                  },
                }, {
                  key: 'rakuten',
                  items: {
                    base: {
                      value: get(this.details, 'map.commission.base', 0),
                      format: value => `${ value }%`,
                    },
                    min: {
                      value: get(this.details, 'map.commission.min', 0),
                      format: value => `${ value }%`,
                    },
                    max: {
                      value: get(this.details, 'map.commission.max', 0),
                      format: value => `${ value }%`,
                    },
                    type: {
                      value: get(this.details, 'map.commission.type', 'PERCENTAGE'),
                      format: this.formatType,
                    },
                    url: {
                      value: 'www.test.net',
                    },
                  },
                },
              ],
            },
          },
        },
      }],
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
    feed() {
      return get(this.details, 'map.feed', '')
    },
  },
  methods: {
    ...mapActions('merchants', [
      'updateMerchant',
      'deleteMerchant',
    ]),
    formatType(type) {
      switch (type) {
        case 'PERCENTAGE':
          return 'Percents'
        case 'DOLLARS':
        default:
          return 'Dollars'
      }
    },
    async submitUpdate(notes) {
      this.modals.update = false

      const payload = {}
      const changedFields = this.fields.filter(field => field.changed)

      for (const field of changedFields) {
        if (field.key === 'categories') {
          payload[field.key] = field.value.map(el => el.id)
        } else {
          payload[field.key] = field.value
        }
      }

      const [error, response] = await this.updateMerchant({
        merchantId: this.merchantId,
        payload,
      })

      if (error) {
        console.error(error)
        return
      }

      this.$emit('cancel')
      this.$emit('update', response)
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Merchant details updated sussessfully.',
      })
    },
    async submitDelete(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteMerchant(this.merchantId)

      if (error) {
        console.error(error)
        return
      }

      this.$router.push('/merchants')
      this.$notify({
        type: 'info',
        title: 'Deleted',
        message: 'Global merchant deleted successfully.',
      })
    },
  },
}
</script>

<template>
  <div>
    <edit-layout
      :source="details"
      :fields="fields"
      :presets="feedOffers"
      @cancel="$emit('cancel')"
      @update="modals.update = true"
      @remove="modals.remove = true"
    >
      <template slot="removeButton">
        <span>Delete Global Merchant</span>
      </template>
      <template slot="updateButton">
        <span>Save Changes</span>
      </template>
      <template
        v-slot:footerTitle="slotProps"
      >
        <div
          :class="$style.editFooterTitle"
          :style="slotProps.slotStyles"
        >
          <div>Commission Tracking Details</div>
          <div :class="$style.editFooterActive">
            Active: {{ feed }}
          </div>
        </div>
      </template>
    </edit-layout>
    <merchand-update-modal
      v-if="modals.update"
      :visible.sync="modals.update"
      :fields="fields"
      @submit="submitUpdate"
    />
    <merchant-remove-modal
      v-if="modals.remove"
      :visible.sync="modals.remove"
      @submit="submitDelete"
    />
  </div>
</template>

<style lang="scss" module>
.editFooterTitle {
  margin-top: rem(80px);
  margin-bottom: rem(50px);
  font-size: rem(20px);
  font-weight: bold;
}

.editFooterActive {
  margin-top: rem(5px);
  font-size: rem(14px);
  color: #14be21;
}
</style>
