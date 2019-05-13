<script>
export default {
  name: 'AddClientModal',
  data() {
    return {
      form: {
        clientName: null,
        clientLogo: null,
        feeds: [],
      },
      rules: {
        clientName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        clientLogo: [
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
    }
  },
  computed: {
    uploaderPlaceholder() {
      return this.form.clientLogo || '160px - 60px'
    },
  },
  methods: {
    clientLogoUpload() {
      // upload image and update {form.clientLogo}
    },
    onSubmit() {
      // submit form
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="New Client Setup"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="left"
        >
          <el-form-item
            label="Client name"
            prop="clientName"
          >
            <el-input
              v-model="form.clientName"
              placeholder="Name"
            />
          </el-form-item>

          <el-form-item
            label="Client logo"
            prop="clientLogo"
          >
            <el-upload
              action=""
              :class="$style.uploader"
              :file-list="form.clientLogo"
              :show-file-list="false"
              :on-success="clientLogoUpload"
            >
              <el-button
                type="primary"
                plain
              >
                Select File
              </el-button>
              <div
                slot="tip"
                :class="$style['form-uploader-tip']"
              >
                {{ uploaderPlaceholder }}
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item
            :class="$style['form-item']"
            label-width="70px"
            label="Feeds"
            prop="feeds"
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
            Create New Client
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

  .uploader {
    display: flex;
    align-items: center;
    width: 100%;

    :global {
      .el-button {
        flex-shrink: 0;
      }
    }
  }

  .form-uploader-tip {
    width: calc(100% + 2px);
    height: 40px;
    padding: 0 1rem;
    margin-left: -2px;
    color: #c0c4cb;
    border: solid 1px #DCDFE6;
    border-left: none;
    border-radius: 0 4px 4px 0;
  }

  .form-feeds {
    display: flex;
    justify-content: flex-end;

    :global {
      .el-checkbox {
        margin-right: 0;

        &__label {
          padding-left: 0.5rem;
        }
      }
    }
  }
</style>
