<script>
import pick from 'lodash/pick'
import capitalize from 'lodash/capitalize'
import RetailerRemoveModal from './modals/retailer-remove'

export default {
  name: 'RetailerEdit',
  components: {
    RetailerRemoveModal,
  },
  props: {
    retailer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        status: 'inactive',
        retailer_name: '',
        description: '',
        website: '',
        logo: '',
      },
      rules: {
        retailer_name: [{
          required: true,
          message: 'Retailer name is required',
        }],
        description: [{
          required: true,
          message: 'Description is required',
        }, {
          max: 255,
          message: 'Length should be less than 255',
        }],
      },
      modals: {
        remove: false,
      },
    }
  },
  computed: {
    status() {
      return capitalize(this.form.status)
    },
  },
  created() {
    this.form = pick(this.retailer, [
      'status',
      'retailer_name',
      'description',
      'website',
      'logo',
    ])
  },
  methods: {
    onSave() {
      this.$emit('cancel')
      this.$notify({
        type: 'success',
        title: 'Retailer saved',
        message: 'Changes successfully saved.',
      })
    },
    async submitRemove() {
      this.modals.remove = false
      this.$notify({
        type: 'success',
        title: 'Retailer deleted',
        message: 'Retailer successfully deleted.',
      })
    },
  },
}
</script>

<template>
  <el-card>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label="Status"
        prop="status"
        required
        :class="$style.formItem"
      >
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#a7a7a7"
          active-value="active"
          inactive-value="inactive"
        />
        <span :class="$style.status">
          {{ status }}
        </span>
      </el-form-item>
      <el-form-item
        label="Retailer Name"
        prop="retailer_name"
        required
        :class="$style.formItem"
      >
        <el-input
          v-model="form.retailer_name"
          :class="$style.formInput"
        />
      </el-form-item>
      <el-form-item
        label="Retailer Description"
        prop="description"
        required
        :class="$style.formItem"
      >
        <the-textarea
          v-model="form.description"
          :class="$style.formInput"
        />
      </el-form-item>
      <el-form-item
        label="Retailer Website"
        prop="website"
        :class="$style.formItem"
      >
        <el-input
          v-model="form.website"
          :class="$style.formInput"
        />
      </el-form-item>
      <el-form-item
        label="Retailer Logo (500 x 500 px minimum)"
        prop="logo"
        :class="$style.formItem"
      >
        <hub-image-uploader
          v-model="form.logo"
          :class="$style.formInput"
        >
          <template #title>
            <div :class="$style.uploadPlus">
              +
            </div> Select file
          </template>
        </hub-image-uploader>
      </el-form-item>
      <div :class="$style.controls">
        <el-button
          type="danger"
          @click="modals.remove = true"
        >
          Delete Retailer
        </el-button>
        <div>
          <el-button
            plain
            @click="$emit('cancel')"
          >
            Cancel
          </el-button>
          <el-button
            type="primary"
            @click="onSave"
          >
            Save Retailer
          </el-button>
        </div>
      </div>
      <retailer-remove-modal
        v-if="modals.remove"
        :visible.sync="modals.remove"
        @submit="submitRemove"
      />
    </el-form>
  </el-card>
</template>

<style lang="scss" module>
.formItem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.formInput {
  min-width: rem(500px);
}

.status {
  margin-left: rem(14px);
}

.uploader {
  position: absolute;
  height: rem(40px);
}

.uploadPlus {
  display: inline-flex;
  margin-right: rem(4px);
  transform: scale(1.6);
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
