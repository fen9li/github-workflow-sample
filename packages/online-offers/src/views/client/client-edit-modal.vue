<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import find from 'lodash/find'

export default {
  name: 'EditClientModal',
  components: {
    uploadcare,
  },
  props: {
    client: {
      type: Object,
      default: null,
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
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
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
    client(client) {
      if (client) {
        this.form.name = client.name,
        this.form.logo = client.logo,
        this.form.feeds = client.feeds.map(item => {
          return item.name
        })
      }
    },
  },
  mounted() {

  },
  methods: {
    ...mapActions('catalogues', ['createCatalog', 'updateCatalog']),
    ...mapMutations('catalogues', {
      updateTable: 'UPDATE_TABLE',
    }),
    onSuccessUploading(img) {
      this.form.logo = img.originalUrl
      this.logoName = img.name
    },
    onSubmit() {
      const feeds = this.form.feeds.map(item => {
        const feed = find(this.feeds, { 'name': item })
        return feed.slug
      })

      if (this.client) {
        this.updateCatalog({
          ...this.form,
          feeds,
          id: this.client.id,
        }).then(() => {
          this.updateTable()
          this.$emit('catalogues-updated')
        })
      } else {
        this.createCatalog({
          ...this.form,
          feeds,
        }).then(() => {
          this.updateTable()
          this.$emit('catalogues-created')
        })
      }
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      :title="client ? 'Edit Client Details' : 'New Client Setup'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
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
                :class="$style['form-uploader-tip']"
              >
                {{ uploaderPlaceholder }}
              </div>
            </div>
          </el-form-item>

          <el-form-item
            :class="$style['form-item']"
            label-width="70px"
            label="Feeds"
            prop="feeds"
          >
            <el-checkbox-group
              v-model="form.feeds"
              :class="$style['form-feeds']"
            >
              <el-checkbox
                v-for="(feed, index) in feeds"
                :key="index"
                :label="feed.name"
              />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            v-if="client"
            label="Notes"
          >
            <el-input type="textarea" />
          </el-form-item>
        </el-form>

        <div
          slot="footer"
          class="modal__footer"
        >
          <el-button
            type="primary"
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

  .form-uploader-tip {
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

  .form-feeds {
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
    border: rem(1px) solid #DCDFE6;
    border-radius: rem(4px);
  }

  .uploadcare{
    order: 2;
  }

  .uploadButton {
    height: 100%;
    background-color: #DCDFE6;
    border-width: 0 0 0 1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:hover {
      border-color: #DCDFE6 !important;
    }
  }
</style>
