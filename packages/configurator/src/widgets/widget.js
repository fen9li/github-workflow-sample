import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import capitalize from 'lodash/capitalize'

class Widget {
  constructor(payload) {
    this.config = payload.config
    this.meta = payload.meta
    this.key = payload.key
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
    const data = cloneDeep(this.config || {})
    const hasProps = this.config.hasOwnProperty('props')
    const form = get(this.builderInstance, 'form') || {}
    const hasFormData = Object.keys(form).length > 0

    if (hasProps && hasFormData) {
      this.config.props = form
      data.props = form

      return data
    }

    return hasFormData ? form : data
  }
}

export default Widget
