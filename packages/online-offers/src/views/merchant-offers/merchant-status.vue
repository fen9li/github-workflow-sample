<script>
export default {
  name: 'MerchantStatus',
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      merchantName: '',
    }
  },
  computed: {
    active() {
      return this.row.status === 'active'
    },
  },
  methods: {
    onSubmit() {

    },
  },
}
</script>

<template>
  <div>
    <span v-if="active">Active</span>
    <el-button
      v-else
      type="text"
      :class="$style.activate"
      @click.stop="dialogVisible = true"
    >
      Activate
    </el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Associate Offer"
    >
      <div
        class="modal__footer"
      >
        <el-button
          class="wide-button"
          type="primary"
          @click.stop="onSubmit"
        >
          Associate
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.activate {
  font-size: 1rem;
}
</style>
