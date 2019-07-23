<script>
import { mapActions, mapGetters } from 'vuex'
import find from 'lodash/find'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'EditCatalogueModal',
  props: {
    catalogue: {
      type: Object,
      default: null,
    },
    processor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: null,
        logo: null,
        feeds: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        logo: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        feeds: [
          {
            type: 'array',
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
      },
      progress: false,
    }
  },
  computed: {
    ...mapGetters('feeds', ['feeds']),
  },
  watch: {
    catalogue() {
      this.prefillFields()
    },
  },
  created() {
    this.prefillFields()
  },
  methods: {
    ...mapActions('catalogues', [
      'createCatalogue',
      'updateCatalogue',
    ]),
    prefillFields() {
      const { form, catalogue } = this

      if (catalogue) {
        form.name = catalogue.name
        form.logo = catalogue.logo
        form.feeds = catalogue.feeds.map(i => i.name)
      }
    },
    onSuccessUploading(img) {
      this.form.logo = img.cdnUrl
      this.$refs.form.validateField('logo')
    },
    onSubmit() {
      const operation = this.catalogue ? 'updateCatalogue' : 'createCatalogue'

      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        const feeds = this.form.feeds.map(item => {
          const feed = find(this.feeds, { name: item })
          return feed.slug
        })

        const payload = {
          ...this.form,
          feeds,
        }

        if (this.catalogue) {
          payload.id = this.catalogue.id
        }

        this.progress = true

        this[operation](payload).then(() => {
          this.progress = false
          this.$emit(this.catalogue ? 'catalogues-updated' : 'catalogues-created')
          this.processor.getData()
        })

        this.$emit('submit', this.form.notes)
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      :title="catalogue ? 'Edit Client Details' : 'New Client Setup'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="top"
        >
          <el-form-item
            label="Client name"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="Name"
            />
          </el-form-item>

          <el-form-item
            label="Client logo"
            prop="logo"
          >
            <image-uploader
              :image="form.logo"
              theme="input"
              @onUpload="onSuccessUploading"
            />
          </el-form-item>

          <el-form-item
            :class="$style.formItem"
            label-width="70px"
            label="Feeds"
            prop="feeds"
          >
            <el-checkbox-group
              v-model="form.feeds"
              :class="$style.formFeeds"
            >
              <el-checkbox
                v-for="(feed, index) in feeds"
                :key="index"
                :label="feed.name"
              />
            </el-checkbox-group>
          </el-form-item>
          <!-- <el-form-item
            v-if="client"
            label="Notes"
          >
            <el-input type="textarea" />
          </el-form-item> -->
        </el-form>

        <div
          slot="footer"
          class="modal__footer"
        >
          <el-button
            type="primary"
            class="el-button--wide"
            :loading="progress"
            @click="onSubmit"
          >
            Save
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  :global {
    .el-dialog {
      max-width: 35rem !important;
    }

    .el-form-item {
      .el-checkbox-group {
        width: 100%;
      }
    }
  }
}
</style>
