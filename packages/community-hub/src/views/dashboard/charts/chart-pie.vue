<script>
import * as d3 from 'd3'
import chartMixin from './chart-mixin'

export default {
  mixins: [chartMixin],
  computed: {
    radius() {
      return Math.min(this.clientWidth, this.clientHeight) / 2 - 20
    }
  },
  methods: {
    arcTween(arc) {
      return function(d) {
        // eslint-disable-next-line no-invalid-this
        const interpolate = d3.interpolate(this._current, d)
        return t => {
          // eslint-disable-next-line no-invalid-this
          this._current = interpolate(t)
          // eslint-disable-next-line no-invalid-this
          return arc(this._current)
        }
      }
    },
    drawLines(g) {
      return g.attr('points', d => {
        const pos = this.outerArc.centroid(d)
        pos[0] = pos[0] + 50 * (this.midAngle(d) < Math.PI ? 1 : -1)
        return [this.arc.centroid(d), this.outerArc.centroid(d), pos]
      })
    },
    drawPolylineLabels(g) {
      return g
        .text(d =>
          typeof this.labelTemplate === 'function'
            ? this.labelTemplate(d.data)
            : d.data.data
        )
        .attr('transform', d => {
          const pos = this.outerArc.centroid(d)
          pos[0] = pos[0] + 55 * (this.midAngle(d) < Math.PI ? 1 : -1)
          return 'translate(' + pos + ')'
        })
        .style('text-anchor', d => (this.midAngle(d)) < Math.PI ? 'start' : 'end')
    },
    updateData() {
      const pieDatasets = this.pie(this.datasets)

      this.segments.data(pieDatasets)
        .transition()
        .duration(750)
        .attrTween('d', this.arcTween(this.arc))

      this.polylines.data(pieDatasets)
        .transition()
        .duration(750)
        .call(this.drawLines)

      this.polylineLables.data(pieDatasets)
        .transition()
        .duration(750)
        .call(this.drawPolylineLabels)
    },
    drawChart() {
      this.pie = d3.pie().sort(null).value(d => d.data)
      this.arc = d3.arc().innerRadius(0).outerRadius(this.radius * 0.8)
      this.outerArc = d3.arc()
        .outerRadius(this.radius * 0.8)
        .innerRadius(this.radius * 0.5)

      this.chart.attr('transform', `translate(${this.clientWidth / 2 - 60}, ${this.clientHeight / 2})`)

      /**
       * Create segments
       */

      // Shadow for segment
      this.chart.append('defs')
        .append('filter')
        .attr('id', 'shadow')
        .append('feDropShadow')
        .attr('in', 'SourceGraphic')
        .attr('stdDeviation', 7)
        .attr('result', 'dropShadow')
        .attr('flood-color', '#000000')
        .attr('flood-opacity', '0.1')
        .attr('dx', 0)
        .attr('dy', 7)

      this.segments = this.chart
        .append('g')
        .attr('class', 'segments')
        .selectAll('path')
        .data(this.pie(this.datasets))
        .enter()
        .append('path')
        .attr('class', 'segment')
        .attr('d', this.arc)
        .attr('fill', d => d.data.fill)
        .on('mouseover', handleSegmentMouseover)
        .on('mouseout', handleSegmentMouseout)

      function handleSegmentMouseover() {
        // eslint-disable-next-line no-invalid-this
        d3.select(this)
          .transition()
          .ease(d3.easeSin)
          .duration(200)
          .attr('transform', 'scale(1.1, 1.1)')
          .style('filter', 'url(#shadow)')
      }

      function handleSegmentMouseout() {
        // eslint-disable-next-line no-invalid-this
        d3.select(this)
          .transition()
          .ease(d3.easeSin)
          .duration(200)
          .attr('transform', 'scale(1, 1)')
          .style('filter', null)
      }

      /**
       * Create polyline
       */
      this.polylines = this.chart
        .append('g')
        .attr('class', 'lines')
        .selectAll('polyline')
        .data(this.pie(this.datasets))
        .enter()
        .append('polyline')
        .style('pointer-events', 'none')
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .call(this.drawLines)

      /**
       * Create labels for polyline
       */
      this.polylineLables = this.chart
        .append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(this.pie(this.datasets), d => d.data)
        .enter()
        .append('text')
        .attr('dy', '.35em')
        .style('font-size', 13)
        .call(this.wrap, 100)
        .call(this.drawPolylineLabels)
    },
    drawLegend() {
      const legendRectSize = 14
      const legendSpacing = 10
      const legendWidth = 120
      const legendAreaOffset = 10

      const legend = this.legend
        .selectAll('g')
        .data(this.datasets)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
          const horz = this.clientWidth - legendWidth - legendAreaOffset
          const height = legendRectSize + legendSpacing * 2
          const vert = legendAreaOffset + (i * height)
          return 'translate(' + horz + ',' + vert + ')'
        })

      legend
        .append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .attr('rx', 2)
        .attr('ry', 2)
        .style('stroke-width', ' 2')
        .style('fill', d => d.fill)
        .style('stroke', d => d.fill)

      legend.append('text')
        .text(d => d.label)
        .style('font-size', 14)
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', function() {
          // eslint-disable-next-line no-invalid-this
          const h = this.getBBox().height
          return legendRectSize + ((legendRectSize - h) / 2)
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
