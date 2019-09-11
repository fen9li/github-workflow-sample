import get from 'lodash/get'
import capitalize from 'lodash/capitalize'

class Widget {
  constructor(payload) {
    this.config = payload.config
    this.meta = payload.meta
    this.builderInstance = null
  }

  get title() {
    const name = get(this.meta, 'name', 'widget')
    const title = get(this.meta, 'title')

    return title || capitalize(name)
  }

  get preview() {
    return get(this.meta, 'preview', null)
  }

  get builder() {
    return get(this.meta, 'builder', null)
  }

  registerBuilder(instance) {
    this.builderInstance = instance
  }

  build() {
    const { builderInstance, config } = this
    const widgetData = {
      ...config,
    }

    if (builderInstance && builderInstance.form) {
      widgetData.props = builderInstance.form
      this.config.props = builderInstance.form
    }

    return widgetData
  }
}

export default Widget
