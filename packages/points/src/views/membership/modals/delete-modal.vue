<script>
import { mapActions } from 'vuex'
export default {
  name: 'DeleteMembershipModalPoints',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    ...mapActions('membership', ['deleteMembership']),
    async submit() {
      this.progress = true
      const [, result] = await this.deleteMembership(this.id)
      if (result || typeof result === 'string') {
        this.$router.push({ name: 'memberships' })
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
        src="@/assets/remove.png"
        :class="$style.image"
      >
    </div>
    <div :class="$style.title">
      Delete Membership
    </div>
    <div :class="$style.text">
      Are you sure you wish to delete this membership?
    </div>
    <el-button
      type="danger"
      class="el-button--wide"
      :class="$style.submit"
      :loading="progress"
      @click="submit"
    >
      Delete Membership
    </el-button>
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
  width: 80%;
  margin: auto;
  margin-top: 2rem;
}
</style>
