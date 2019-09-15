import DefaultPreview from '~/widgets/preview-default'
import SliderBuilder from './slider-builder'
import SliderItemBuilder from './slider-item-builder'

export const Slider = {
  name: 'slider',
  title: 'Slider',
  preview: DefaultPreview,
  builder: SliderBuilder,
}

export const SliderItem = {
  parent: Slider.name,
  title: 'Slider Item',
  preview: DefaultPreview,
  builder: SliderItemBuilder,
}
