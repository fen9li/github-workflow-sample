<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      table: {
        processor: {
          data: this.items,
        },
      },
      filters: [],
      columns: [],
    }
  },
  methods: {
    link() {
      // We haven't endpoint for bulk operation yet
      // For single {{baseUrl}}/catalogues/{{catalogueId}}/merchants/{{merchantId}}
    },
  },
}
</script>

<template>
  <div>
    <div :class="$style.buttonWrapper">
      <el-button
        type="primary"
        :disabled="!items || !items.length"
        @click="showModal = true"
      >
        Link
      </el-button>
    </div>
    <el-dialog
      :visible.sync="showModal"
      title="Link Merchants"
      modal-append-to-body
      append-to-body
      width="800px"
    >
      <div :class="$style.subtitle">
        Are you sure you wish to link these Merchants from {{ name }}?
      </div>
      <h1>
        TODO Add selected table Table
      </h1>

      <div :class="$style.link">
        <el-button
          type="primary"
          @click="link"
        >
          Link
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: rem(0 48px 16px 0);
  }

  .link {
    display: flex;
    justify-content: center;
  }
</style>
