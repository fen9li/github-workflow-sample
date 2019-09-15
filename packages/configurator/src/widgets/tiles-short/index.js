import DefaultPreview from '~/widgets/preview-default'
import TilesShortBuilder from './tiles-short-builder'
import TilesShortBuilderItem from './tiles-short-builder-item'

export const TilesShort = {
  name: 'tiles-short',
  title: 'Short Content Tiles',
  preview: DefaultPreview,
  builder: TilesShortBuilder,
}

export const TilesShortItem = {
  parent: TilesShort.name,
  title: 'Short Content Tile',
  preview: DefaultPreview,
  builder: TilesShortBuilderItem,
}
