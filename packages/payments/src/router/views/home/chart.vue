<script>
import * as d3 from 'd3'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      width: 670,
      height: 200,
      margin: {
        left: 50,
        right: 15,
        top: 20,
        bottom: 30,
      },
      colors: ['rgba(208, 153, 237, 0.8)', 'rgba(76, 145, 248, 0.8)'],
    }
  },
  computed: {
    keys() {
      const first = get(cloneDeep(this.data), '[0]', {})
      delete first.date
      return Object.keys(first)
    },
  },
  mounted() {
    this.buildChart()
  },
  methods: {
    buildChart() {
      const { data, width, height, margin } = this

      const formatDate = d3.timeFormat('%b')
      const parseDate = d3.timeParse('%Y-%m-%d')

      const chart = this.chart = d3.select(this.$refs.chart)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 '+width+' '+height)

      const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => parseDate(d.date)))
        .range([margin.left, width - margin.right])


      const yMax = cloneDeep(data).map(item => {
        delete item.date
        return d3.max(Object.values(item))
      })

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(yMax)]).nice()
        .range([height - margin.bottom * 1.5, margin.top])

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .attr('opacity', '0.5')
        .attr('style', 'font-size:14px')
        .call(
          d3.axisBottom(xScale)
            .ticks(d3.timeMonth)
            .tickSize(0, 0)
            .tickFormat(formatDate)
        )
        .call(g => g.select('.domain').remove())

      const yAxis = g => g
        .attr('opacity', '0.5')
        .attr('style', 'font-size:14px')
        .call(
          d3.axisRight(yScale)
            .ticks(height / 50)
            .tickSize(0, 0)
            .tickFormat(d => '$' + d)
        )
        .call(g => g.select('.domain').remove())

      chart.append('g')
        .call(xAxis)

      chart.append('g')
        .call(yAxis)


      this.keys.forEach((key, i) => {
        const area = d3.area()
          .curve(d3.curveMonotoneX)
          .x(d => xScale(parseDate(d.date)))
          .y0(yScale(0))
          .y1(d => yScale(d[key]))

        chart.append('path')
          .datum(data)
          .attr('fill', this.colors[i])
          .attr('opacity', '1')
          .attr('d', area)
      })


      // https://observablehq.com/@d3/line-chart-with-tooltip Enough actual
      // https://bl.ocks.org/cjhin/8872a492d44694ecf5a883642926f19c Old d3 version
      // const tooltip = chart.append('g')

      chart.on('touchmove mousemove', () => {
        // Show tooltip with relative position
      })

      chart.on('touchend mouseleave', () => {
        // Hide tooltip
      })
    },
  },
}
</script>

<template>
  <svg
    ref="chart"
    :width="width"
    :height="height"
  />
</template>
