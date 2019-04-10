<script>
export default {
  name: 'BaseLoaderGuide',
  guide: {
    name: 'Loader',
    category: 'event',
  },
  data() {
    return {
      fullscreen: false,
      transparent: false,
    }
  },
}
</script>

<template>
  <div>
    <h3>Basic usage</h3>
    <base-loader class="inline-flex" />

    <h3>Sizes</h3>
    <div class="flex-list text-center">
      <div class="flex-list-item">
        <h4>Small</h4>
        <base-loader size="small" />
      </div>
      <div class="flex-list-item">
        <h4>Medium</h4>
        <base-loader />
      </div>
      <div class="flex-list-item">
        <h4>Large</h4>
        <base-loader size="large" />
      </div>
    </div>

    <h3>Variations</h3>
    <div class="flex-list">
      <div class="flex-list-item">
        <base-button @click="fullscreen = true">
          Show fullscreen loader
        </base-button>
        <base-loader
          v-if="fullscreen"
          fullscreen
          size="large"
          @click.native="fullscreen = false"
        />
      </div>
      <div class="flex-list-item">
        <base-button @click="transparent = true">
          Show fullscreen transparent loader
        </base-button>
        <base-loader
          v-if="transparent"
          fullscreen
          transparent
          size="large"
          @click.native="transparent = false"
        />
      </div>
    </div>
  </div>
</template>
