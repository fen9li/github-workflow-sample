<script>
import * as d3 from 'd3'
import chartMixin from './chart-mixin'

export default {
  mixins: [chartMixin],
  data() {
    return {
      margin: {
        top: 50,
        right: 30,
        bottom: 40,
        left: 50
      }
    }
  },
  computed: {
    totalWidth() {
      return this.clientWidth - this.margin.left - this.margin.right
    },
    totalHeight() {
      return this.clientHeight - this.margin.top - this.margin.bottom
    },
    data() {
      return this.datasets.reduce(
        (values, dataset) => values.concat(dataset.data), []
      )
    },
    dataForCircles() {
      return this.datasets.reduce((circles, dataset) => {
        circles.push(...dataset.data.map((d, idx) => [idx, d, dataset.fill]))
        return circles
      }, [])
    }
  },
  methods: {
    showTooltip([idx, d, fill]) {
      const text = this.tooltip
        .selectAll('text')
        .html(d)

      const textPadding = 10
      const textSize = text.node().getBBox()

      const tooltipHeight = 20
      const tooltipWidth = textSize.width + textPadding * 2

      text.attr('transform', `translate(${textPadding}, 15)`)

      this.tooltip.selectAll('rect')
        .attr('height', tooltipHeight)
        .attr('width', tooltipWidth)
        .style('fill', fill)

      this.tooltip
        .selectAll('polygon')
        .style('fill', fill)
        .attr('transform', function() {
          // eslint-disable-next-line no-invalid-this
          return `translate(${(tooltipWidth - this.getBBox().width) / 2}, ${tooltipHeight})`
        })

      const x = this.x(this.labels[idx])
      const y = this.y(d)


      this.tooltip
        .style('opacity', 1)
        .attr('transform', function() {
          // eslint-disable-next-line no-invalid-this
          return `translate(${x - (this.getBBox().width / 2)},${y - 30})`
        })
    },
    hideTooltip() {
      this.tooltip.style('opacity', 0)
    },
    drawYAxis() {
      this.y.domain([d3.min(this.data), d3.max(this.data)])
      this.yAxis.call(
        d3.axisLeft(this.y)
          .tickSizeInner(0)
          .tickSizeOuter(0)
          .ticks(5)
          .tickFormat(d3.format('~s')))
        .style('font-size', '11')
        .call(g => g.select('.domain').remove())
        .selectAll('text')
        .style('text-anchor', 'start')
        .attr('x', -50)
        .attr('dy', 0)
    },
    drawXAxis() {
      this.x.domain(this.labels)
      this.xAxis.call(d3.axisBottom(this.x)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .ticks(this.labels.length))
        .style('font-size', '11')
        .call(g => g.selectAll('text')
          .attr('x', 0)
          .attr('dy', 30))
    },
    drawLine(g) {
      return g.attr('d', d => d3.line()
        .x((_, idx) => this.x(this.labels[idx]))
        .y(d => this.y(d))
        (d.data)
      )
    },
    drawCircle(g) {
      return g.attr('transform', ([idx, d]) => `translate(${this.x(this.labels[idx])},${this.y(d)})`)
    },
    updateData() {
      this.drawYAxis()

      this.lines.data(this.datasets)
        .transition()
        .duration(750)
        .call(this.drawLine)

      this.circles.data(this.dataForCircles)
        .transition()
        .duration(750)
        .call(this.drawCircle)
    },
    drawChart() {
      this.chart.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)

      /**
       * Create X Axis
       */
      this.x = d3.scalePoint().range([0, this.totalWidth])

      this.xAxis = this.chart.append('g')
        .attr('transform', `translate(0,${this.totalHeight})`)
        .attr('color', 'var(--color-text-light)')

      this.drawXAxis()

      /**
       * Create Y axis
       */
      this.y = d3.scaleLinear().range([ this.totalHeight, 0 ]).nice()

      this.yAxis = this.chart.append('g')
        .attr('color', 'var(--color-text-light)')

      this.drawYAxis()

      /**
       * Create lines
       */
      this.lines = this.chart.selectAll('.line')
        .data(this.datasets)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', d => d.fill)
        .attr('stroke-width', 3)
        .call(this.drawLine)

      /**
       * Create circle for tooltips
       */
      this.circles = this.chart.selectAll('.circle')
        .data(this.dataForCircles)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', 'transparent')
        .on('mouseover', this.showTooltip)
        .on('mouseleave', this.hideTooltip)
        .call(this.drawCircle)

      /**
       * Create tooltip
       */
      this.tooltip = this.chart.append('g')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('pointer-events', 'none')
      this.tooltip.append('rect')
        .attr('rx', 2)
        .attr('ry', 2)
      this.tooltip.append('text')
        .style('fill', 'var(--color-primary-text)')
        .style('font-size', '14')
      this.tooltip.append('polygon')
        .attr('points', '0 0 10 0 5 5')
    },
    drawLegend() {
      const legendRectSize = 14
      const legendAreaOffset = 5

      const legend = this.legend
        .selectAll('g')
        .data(this.datasets)
        .enter()
        .append('g')

      legend
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('rx', 2)
        .attr('ry', 2)
        .style('fill', d => d.fill)
        .style('stroke', d => d.fill)

      legend
        .append('text')
        .text(d => d.label)
        .style('font-size', 14)
        .attr('x', legendRectSize + 10)
        .attr('y', function() {
          // eslint-disable-next-line no-invalid-this
          const h = this.getBBox().height
          return legendRectSize + ((legendRectSize - h) / 2)
        })

      let offset = this.clientWidth
      legend.attr('transform', function () {
        // eslint-disable-next-line no-invalid-this
        offset -= this.getBBox().width + 20
        return 'translate(' + offset + ',' + legendAreaOffset + ')'
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
