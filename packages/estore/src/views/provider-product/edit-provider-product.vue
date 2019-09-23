<script>
import stepper from './edit/stepper'

export default {
  components: {
    stepper,
  },
}
</script>

<template>
  <main-layout title="Edit Provider Product">
    <el-card>
      <stepper />
      <router-view />
    </el-card>
  </main-layout>
</template>
