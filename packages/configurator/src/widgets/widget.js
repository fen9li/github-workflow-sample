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
    return capitalize(name)
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
    return this.config
  }
}

export default Widget
