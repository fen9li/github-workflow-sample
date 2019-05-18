<style lang="scss" module src="./theme/json.scss"/>

<script>
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

export default {
  name: 'AsCode',
  functional: true,
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },
  render(h, context) {
    let [{ text: code }] = context.children
    code = code.replace(/(^[\s\u200b]*|[\s\u200b]*$)/g, '')
    const root = context.$style.root
    const data = {
      class: {
        [root]: true,
      },
      ...context.data,
      props: {
        options: {
          mode: 'application/json',
          lineNumbers: true,
          readOnly: 'nocursor',
          viewportMargin: Infinity,
        },
        ...context.props,
        code,
      },

    }
    return h(VueCodemirror.codemirror, data, context.children)
  },
}
</script>

