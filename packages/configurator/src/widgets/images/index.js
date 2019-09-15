import DefaultPreview from '~/widgets/preview-default'
import ImagesBuilder from './images-builder'
import ImagesBuilderItem from './images-builder-item'

export const Images = {
  name: 'images',
  title: 'Images',
  preview: DefaultPreview,
  builder: ImagesBuilder,
}

export const ImagesItem = {
  parent: Images.name,
  title: 'Image',
  preview: DefaultPreview,
  builder: ImagesBuilderItem,
}
