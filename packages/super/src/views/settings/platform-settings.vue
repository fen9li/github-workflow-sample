<script>
export default {
  data: function() {
    return {

    }
  }
}
</script>

<template>
  <el-card shadow="always">
    <h3 :class="$style['settings-title']">
      Platform settings
    </h3>
    <div :class="$style['row']">
      <el-col>Location</el-col>
      <el-col :class="$style['bold']">
        Melbourne Australia
      </el-col>
    </div>
    <div :class="$style['row']">
      <el-col>User Login Attempts</el-col>
      <el-col :class="$style['bold']">
        3
      </el-col>
    </div>
    <div :class="$style['row']">
      <el-col>Session Timeout Length</el-col>
      <el-col :class="$style['bold']">
        10 Minutes
      </el-col>
    </div>
  </el-card>
</template>

<style lang="scss" module>
  :global {
    .el-card {
      margin-top: 2rem;
    }
  }

  .row {
    display: flex;
    align-items: center;
    max-width: 400px;
    height: 40px;
  }

  .bold {
    font-weight: bold;
  }

  .settings-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
</style>
