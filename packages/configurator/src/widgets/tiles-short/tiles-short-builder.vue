<script>
import BuilderMixin from '../builder.mixin'

const tileSizes = {
  types: [{ label: 'Tablet', value: 'sm' }, { label: 'Desktop', value: 'md' }],
  options: [
    { label: '1 Tile', value: 'full' },
    { label: '2 Tiles', value: '2' },
    { label: '3 Tiles', value: '3' },
    { label: '4 Tiles', value: '4' },
    { label: '5 Tiles', value: '5' },
    { label: '6 Tiles', value: '6' },
  ]
}

export default {
  name: 'TilesBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
    tiles: null,
    orderMap: new WeakMap(),
    lastOrderNum: -1,
    tileToEdit: null,
    tilesPerRow: {
      sm: null,
      md: null
    },
    tileSizes,
  }),
  computed: {
    config() {
      return this.form
    },
    newTileClass() {
      const { tilesPerRow } = this
      const sizes = Object.keys(this.tilesPerRow)
      let newClass = ''

      sizes.forEach(size => {
        const value = tilesPerRow[size]
        if(tilesPerRow[size]) {
          newClass += value === 'full' ? ` ${size}:w-full` : ` ${size}:w-1/${value}`
        }
      })
      return newClass
    },
  },
  watch: {
    tilesPerRow: {
      handler() {
        this.form.tileClass = this.newTileClass
      },
      deep: true
    }
  },
  created() {
    if (!this.form) {
      const { props } = this.initialConfig

      this.form = props
      this.tiles = props.tiles
      this.initialRowClass = props.tileClass
    }

    this.buildOrderMap()
    this.parseTileClass()
  },
  methods: {
    moveTitleUp(index) {
      const { tiles } = this

      if (index > 0) {
        const tile = tiles[index]
        const prevTitle = tiles[index - 1]

        tiles.splice(index - 1, 2, tile, prevTitle)
      }
    },
    moveTitleDown(index) {
      const { tiles } = this

      if (index + 1 < tiles.length) {
        const tile = tiles[index]
        const nextTitle = tiles[index + 1]

        tiles.splice(index, 2, nextTitle, tile)
      }
    },
    addTitle() {
      const { tiles, orderMap } = this
      const newTile = {}

      tiles.push(newTile)
      orderMap.set(newTile, `Tile ${++this.lastOrderNum}`)
    },
    removeTitle(index) {
      const { tiles } = this

      tiles.splice(index, 1)
    },
    buildOrderMap() {
      const { tiles, orderMap } = this

      tiles.forEach((tile, index) => {
        orderMap.set(tile, `Tile ${index + 1}`)
      })

      this.lastOrderNum = tiles.length
    },
    parseTileClass() {
      const { tilesPerRow } = this
      const { tileClass } = this.form
      if(tileClass) {
        const classArr = tileClass.split(' ')
        classArr.forEach(v => {
          if(v.includes('sm')) {
            tilesPerRow.sm = Number(v.slice(-1)) ? v.slice(-1) : 'full'
          } else if(v.includes('md')) {
            tilesPerRow.md = Number(v.slice(-1)) ? v.slice(-1) : 'full'
          }
        })
      }
    },
  },
}
</script>

<template>
  <div class="hero-builder">
    <template v-if="!tileToEdit">
      <div
        v-if="!tiles.length"
        :class="$style.empty"
      >
        There are no tiles yet
      </div>

      <div v-else>
        <div>
          Tiles per row
          <div
            v-for="(type, idx) in tileSizes.types"
            :key="idx"
            :class="$style.rowSelect"
          >
            <span :class="$style.rowSelectTitle">{{ type.label }}</span>
            <el-select
              v-model="tilesPerRow[type.value]"
            >
              <el-option
                v-for="({ value, label } = option, index) in tileSizes.options"
                :key="index"
                :label="label"
                :value="value"
              />
            </el-select>
          </div>
        </div>

        <base-menu-link
          v-for="(tile, index) in tiles"
          :key="index"
          :title="orderMap.get(tile)"
          @click.native="tileToEdit = tile"
        >
          <template slot="actions">
            <el-button
              icon="el-icon-arrow-down"
              @click.stop.prevent="moveTitleDown(index)"
            />
            <el-button
              icon="el-icon-arrow-up"
              @click.stop.prevent="moveTitleUp(index)"
            />
            <el-button
              icon="el-icon-delete"
              @click.stop.prevent="removeTitle(index)"
            />
          </template>
          {{ tile.cta ? tile.cta.path : '' }}
        </base-menu-link>

        <div :class="$style.add">
          <el-button
            icon="el-icon-plus"
            round
            @click="addTitle"
          >
            New Image
          </el-button>
        </div>
      </div>
    </template>

    <base-layout
      v-else
      :title="orderMap.get(tileToEdit)"
      :back="{}"
      :class="$style.editView"
      @back="tileToEdit = null"
    >
      <builder-image
        v-model="tileToEdit.image"
        :ratio="{
          mobile: '32:21',
          desktop: '8:5',
        }"
        label="Image"
      />
      <builder-textarea
        v-if="config.type !== 'image'"
        v-model="tileToEdit.title"
        label="Title"
      />
      <builder-textarea
        v-if="config.type !== 'image'"
        v-model="tileToEdit.text"
        label="Text"
      />
      <builder-cta
        v-model="tileToEdit.cta"
        label="Link"
      />
    </base-layout>
  </div>
</template>

<style lang="scss" module>
.empty {
  font-size: 1.2rem;
  text-align: center;
}
.add {
  margin-top: 1rem;
  text-align: center;
}
.editView {
  position: absolute !important;
  top: 0;
  left: 0;
  background: white;
}
.rowSelect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
}
.rowSelectTitle {
  margin-right: 1rem;
}
</style>
