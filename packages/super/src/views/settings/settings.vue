<script>
import NotificationsSettings from './notifications-settings'
import PlatformSettings from './platform-settings'
export default {
  components: {
    NotificationsSettings,
    PlatformSettings,
  },
  data: function() {
    return {
      activeTab: "first"
    }
  },
}
</script>

<template>
  <main-layout title="Settings">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="Notifications Settings"
        name="first"
      >
        <notifications-settings />
      </el-tab-pane>
      <el-tab-pane
        label="Platform Settings"
        name="second"
      >
        <platform-settings />
      </el-tab-pane>
    </el-tabs>
  </main-layout>
</template>

<style lang="scss" module>
  :global(.el-tabs__header) {
    padding: 0 48px;
    margin-bottom: 0;
  }

  :global(.el-tabs__content) {
    overflow: visible;
  }
</style>
