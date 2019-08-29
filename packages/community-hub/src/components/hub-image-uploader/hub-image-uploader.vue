<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'

export default {
  name: 'HubImageUploader',
  components: {
    uploadcare,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
      localValue: this.value,
      preview: null,
    }
  },
  computed: {
    uploadcareSignature() {
      const { uploadcare: { secretKey, expire } } = this
      return md5(secretKey + expire)
    },
  },
  watch: {
    localValue(val) {
      this.$emit('input', val)
    }
  },
  created() {
    const { value: image } = this
    if (typeof image === 'string' && image.length) {
      this.preview = image
    }
  },
  methods: {
    onSuccessUpload(image) {
      // console.log(image)
      this.preview = image.originalUrl
      this.$emit('input', image.originalUrl)
    },
  },
}
</script>

<template>
  <div>
    <uploadcare
      :public-key="uploadcare.publicKey"
      :secure-signature="uploadcareSignature"
      :secure-expire="uploadcare.expire"
      @success="onSuccessUpload"
    >
      <div :class="$style.container">
        <el-button
          type="info"
          plain
          :class="$style.button"
        >
          <slot name="title">
            Select file
          </slot>
        </el-button>
        <el-input
          value="or drag and drop..."
          readonly
          :class="$style.input"
        />
      </div>
    </uploadcare>
    <div
      v-if="preview"
      :class="$style.preview"
    >
      <div :class="$style.previewImageWrapper">
        <img
          :src="preview"
          :class="$style.previewImage"
        >
      </div>
      <div :class="$style.previewInfo">
        <div>{{ preview }}</div>
        <div :class="$style.previewSize">
          279 KB
        </div>
      </div>
      <div :class="$style.previewCheck">
        <el-icon name="success" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
}

.button {
  z-index: 2;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input {
  margin-left: -1px;

  input {
    color: #8492a6;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.preview {
  display: flex;
  padding: rem(20px);
  margin-top: rem(30px);
  border: 1px solid #DCDFE6;
  border-radius: rem(4px);
}

.previewImageWrapper {
  width: rem(70px);
  height: rem(70px);
  margin-right: rem(30px);
  box-shadow: rem(0 2px 4px 0) rgba(0,0,0,0.13);
}

.previewImage {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.previewInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: rem(11px 0);
  line-height: 1;
}

.previewSize {
  color: #8492a6;
}

.previewCheck {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: rem(21px);
  color: #0fbd1c;
}
</style>
