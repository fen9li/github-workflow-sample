<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import { mapActions, mapGetters } from 'vuex'
import find from 'lodash/find'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  name: 'EditCatalogueModal',
  components: {
    uploadcare,
  },
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
      logoName: null,
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
      uploadcare: {
        expire: new Date(new Date() + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
    }
  },
  computed: {
    ...mapGetters('feeds', ['feeds']),
    uploaderPlaceholder() {
      return this.form.logo || '160px - 60px'
    },
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
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
    ...mapActions('catalogues', ['createCatalog', 'updateCatalog']),
    prefillFields() {
      const { form, catalogue } = this

      if (catalogue) {
        form.name = catalogue.name
        form.logo = catalogue.logo
        form.feeds = catalogue.feeds.map(i => i.name)
      }
    },
    onSuccessUploading(img) {
      this.form.logo = img.originalUrl
      this.logoName = img.name
      this.$refs.form.validateField('logo')
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        const feeds = this.form.feeds.map(item => {
          const feed = find(this.feeds, { name: item })

          return feed.slug
        })

        if (this.catalogue) {
          this.updateCatalog({
            ...this.form,
            feeds,
            id: this.catalogue.id,
          })
            .then(() => this.processor.getData())
            .then(() => this.$emit('catalogues-updated'))
        } else {
          this.createCatalog({
            ...this.form,
            feeds,
          })
            .then(() => this.processor.getData())
            .then(() => this.$emit('catalogues-created'))
        }

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
            <div :class="$style.uploader">
              <uploadcare
                :public-key="uploadcare.publicKey"
                :secure-signature="uploadcareSignature"
                :secure-expire="uploadcare.expire"
                crop="160x60"
                :class="$style.uploadcare"
                @success="onSuccessUploading"
              >
                <el-button
                  type="primary"
                  plain
                  :class="$style.uploadButton"
                >
                  Select File
                </el-button>
              </uploadcare>
              <div
                slot="tip"
                :class="$style.formUploaderTip"
              >
                {{ uploaderPlaceholder }}
              </div>
            </div>
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

.formUploaderTip {
  width: calc(100% + 2px);
  height: 40px;
  padding: 0 1rem 0 0;
  margin-left: -2px;
  overflow: hidden;
  color: #c0c4cb;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-left: none;
  border-radius: 0 4px 4px 0;
}

.formFeeds {
  display: flex;

  :global {
    .el-checkbox {
      &__label {
        padding-left: 0.5rem;
      }
    }
  }
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
</style>
