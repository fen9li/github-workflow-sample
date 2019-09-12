import * as d3 from 'd3'

export default {
  props: {
    width: {
      type: [Number, String],
      default: '100%',
    },
    height: {
      type: [Number, String],
      default: '100%',
    },
    datasets: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    labels: {
      type: Array,
      default: () => []
    },
    labelTemplate: {
      type: Function,
      default: null
    }
  },
  computed: {
    clientWidth() {
      return this.$refs.chart.clientWidth
    },
    clientHeight() {
      return this.$refs.chart.clientHeight
    },
  },
  watch: {
    datasets() {
      if (typeof this.updateData === 'function') {
        this.updateData()
      }
    }
  },
  mounted() {
    this._initSvg()
  },
  methods: {
    _initSvg() {
      this.svg = d3.select(this.$refs.chart)
        .attr('height', this.height)
        .attr('width', this.width)

      this.chart = this.svg.append('g').attr('class', 'chart')

      if (typeof this.drawChart === 'function') {
        this.drawChart()
      }

      this.legend = this.svg.append('g').attr('class', 'legend')

      if (typeof this.drawLegend === 'function') {
        this.drawLegend()
      }
    },
    midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2
    },
    wrap(text, width) {
      text.each(function() {
        // eslint-disable-next-line no-invalid-this
        const text = d3.select(this)
        const words = text.text().split(/\s+/).reverse()
        const lineHeight = 1.1
        const y = text.attr('y')
        const dy = parseFloat(text.attr('dy'))
        let word
        let line = []
        let lineNumber = 0
        let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em')

        while (word = words.pop()) {
          line.push(word)
          tspan.text(line.join(' '))
          if (tspan.node().getComputedTextLength() > width) {
            line.pop()
            tspan.text(line.join(' '))
            line = [word]
            tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word)
          }
        }
      })
    },
  }
}
