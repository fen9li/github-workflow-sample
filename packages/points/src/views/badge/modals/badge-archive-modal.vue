<script>
import ClosableText from '~/components/closable-text'
import { mapActions } from 'vuex'

export default {
  name: 'BadgeArchiveModal',
  components: {
    ClosableText,
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    ...mapActions('badge', [
      'archiveBadge',
    ]),
    async submit() {
      this.progress = true
      const [error] = await this.archiveBadge(this.id)
      if (!error) {
        this.$emit('success')
      }
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    width="32%"
    :class="$style.modal"
    v-on="$listeners"
  >
    <div
      :class="$style.imageWrapper"
    >
      <img
        src="@/assets/badge/archive.png"
        :class="$style.image"
      >
    </div>
    <div :class="$style.title">
      Archive Rule
    </div>
    <div :class="$style.text">
      Are you sure you wish to archive this badge?
    </div>
    <el-button
      type="primary"
      class="el-button--wide"
      :class="$style.submit"
      :loading="progress"
      @click="submit"
    >
      Archive Badge
    </el-button>
    <closable-text
      :class="$style.closableText"
      icon="info"
      text="Archiving will not affect accounts which already earned this badge. Once archived  this badge cannot be earned anymore."
    />
  </el-dialog>
</template>

<style lang="scss" module>
.imageWrapper {
  display: flex;
  width: rem(100px);
  height: rem(100px);
  margin: auto;
}

.image {
  width: 100%;
  height: 100%;
}

.title {
  margin-top: rem(40px);
  font-size: rem(22px);
  font-weight: 400;
  text-align: center;
}

.text {
  margin-top: rem(20px);
  text-align: center;
}

.submit {
  display: block;
}

.submit,
.closableText {
  width: 80%;
  margin: auto;
  margin-top: 2rem;
}
</style>
