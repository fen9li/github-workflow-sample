<script>
import ImageUploader from '@lib/components/image-uploader'
import { mask } from 'vue-the-mask'

export default {
  name: 'ProviderDetailsEditModal',
  directives: {
    mask,
  },
  components: {
    ImageUploader
  },
  props: {
    provider: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      processing: false,
      form: {
        type: '',
        points: 1,
      },
      rules: {
        img: {
          required: true,
          message: 'Logo is required',
        },
      }
    }
  },
  created() {
    this.form = { ...this.provider }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.processing = true
      })
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Provider Details"
    v-bind="$attrs"
    modal-append-to-body
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="form"
      class="modal-form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <div class="united-field">
        <el-form-item
          label="Provider Name"
        >
          <el-input
            :value="form.name"
            disabled
          />
        </el-form-item>

        <el-form-item
          label="Tax Rate"
        >
          <el-input
            v-model="form.taxRate"
            v-mask="['#', '#.#', '#.##', '##.##' ]"
          >
            <template
              #append
            >
              %
            </template>
          </el-input>
        </el-form-item>
      </div>

      <div>
        <el-form-item
          label="Logo URL"
          prop="img"
        >
          <image-uploader
            :image="form.img"
            :class="$style.uploader"
          >
            <span slot="button-text">
              Change Logo
            </span>
          </image-uploader>
        </el-form-item>
      </div>

      <el-button
        type="primary"
        :class="$style.button"
        :loading="processing"
        :disabled="processing"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Save
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.uploader {
  justify-content: flex-start;
  padding: 0;
  border: none;

  :global {
    .el-button {
      position: relative !important;
      margin-left: 2rem;
    }
  }
}
</style>
