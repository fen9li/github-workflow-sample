import DefaultPreview from '~/widgets/preview-default'
import TilesBuilder from './tiles-builder'
import TilesItemBuilder from './tiles-builder-item'

export const Tiles = {
  name: 'tiles',
  title: 'Content Tiles',
  preview: DefaultPreview,
  builder: TilesBuilder,
}

export const Tile = {
  parent: 'tiles',
  title: 'Content Tile',
  preview: DefaultPreview,
  builder: TilesItemBuilder,
}
