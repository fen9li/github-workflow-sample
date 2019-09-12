<script>
export default {
  name: 'BaseBlockEditable',
}
</script>

<template>
  <base-block
    class="base-block-editable"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="actions">
      <el-button
        icon="el-icon-arrow-down"
        @click.stop.prevent="$emit('down')"
      />
      <el-button
        icon="el-icon-arrow-up"
        @click.stop.prevent="$emit('up')"
      />
      <el-button
        icon="el-icon-delete"
        @click.stop.prevent="$emit('delete')"
      />
    </template>
    <slot />
  </base-block>
</template>
