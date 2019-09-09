<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "MembershipModalSuper",
  props: {
    membership: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      progress: false,
      form: {

      },
      rules: {
        providerName: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        slug: [
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
          },
        ],
      },
    }
  },
  computed: {
    ...mapState('providers', ['providers']),
  },
  mounted() {
    if (this.membership) this.form = { ...this.membership }
  },
  methods: {
    ...mapActions('membership', ['createMembership', 'updateMembership']),
    async onSubmit() {
      const { membership, form } = this
      this.progress = true
      let result
      if (membership) {
        [, result] = await this.updateMembership({ id : membership.id, form })
      } else {
        [, result] = await this.createMembership(form)
      }
      if (result) {
        this.$emit('done')
      } else {
        this.progress = false
      }
    }
  },
}
</script>

<template>
  <el-dialog
    :title="membership ? 'Edit Membership' : 'Create Membership'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Provider Name"
        prop="providerName"
      >
        <el-select v-model="form.providerName">
          <el-option
            v-for="(item, index) in providers"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Membership Name"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Membership Slug"
        prop="slug"
      >
        <el-input v-model="form.slug" />
      </el-form-item>
      <el-form-item
        label="Logo URL"
        prop="logo"
      >
        <image-uploader
          :image="form.logo"
          theme="input"
          @onUpload="onSuccessUploading"
        />
      </el-form-item>
      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
        :disabled="progress"
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

</style>
