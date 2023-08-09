/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable func-names */

/* eslint-disable no-bitwise */

/* eslint-disable prefer-destructuring */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as d3 from 'd3'

import { DataPoint } from './radarChart.types'

const drawRadarChart = (
  elementId: string,
  lineClassName: string,
  axisClassName: string,
  legendClassName: string,
  radarClassName: string,
  isDefault: boolean,
  data: DataPoint[],
  radarColor: string,
  radarWidth: number,
  radarHeight: number,
  radarPadding: number,
) => {
  const cfg = {
    radius: 5,
    w: radarWidth,
    h: radarHeight,
    factor: 1,
    factorLegend: 0.85,
    levels: 4,
    maxValue: 0,
    radians: 2 * Math.PI,
    opacityArea: 0.5,
    color: d3.scale.category10(),
  }

  cfg.maxValue = Math.max(cfg.maxValue, d3.max(data.map((o) => o.value)))

  const allAxis = data.map((i) => i.axis)
  const total = allAxis.length
  const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2)

  d3.select(elementId).select('svg').remove()

  const svg = d3
    .select(elementId)
    .append('svg')
    .attr('width', cfg.w + radarPadding)
    .attr('height', cfg.h + radarPadding)
    .append('g')
    .attr('transform', `translate(${radarPadding / 2}, ${radarPadding / 2})`)

  const tooltip = svg
    .append('text')
    .style('opacity', 0)
    .style('font-family', 'sans-serif')
    .style('font-size', 13)

  !isDefault && drawFrame()
  const maxAxisValues: Array<{ x: number; y: number }> = []
  !isDefault && drawAxis()
  const dataValues: Array<[number, number]> = []
  reCalculatePoints()

  const areagg = initPolygon()
  drawPoly()

  !isDefault && drawNode()

  function drawFrame() {
    for (let j = 0; j < cfg.levels; j++) {
      const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels)
      svg
        .selectAll('.levels')
        .data(allAxis)
        .enter()
        .append('svg:line')
        .attr(
          'x1',
          (d, i) =>
            levelFactor *
            (1 - cfg.factor * Math.sin((i * cfg.radians) / total)),
        )
        .attr(
          'y1',
          (d, i) =>
            levelFactor *
            (1 - cfg.factor * Math.cos((i * cfg.radians) / total)),
        )
        .attr(
          'x2',
          (d, i) =>
            levelFactor *
            (1 - cfg.factor * Math.sin(((i + 1) * cfg.radians) / total)),
        )
        .attr(
          'y2',
          (d, i) =>
            levelFactor *
            (1 - cfg.factor * Math.cos(((i + 1) * cfg.radians) / total)),
        )
        .attr('class', lineClassName)
        .style('stroke', 'grey')
        .style('stroke-width', '0.5px')
        .attr(
          'transform',
          `translate(${cfg.w / 2 - levelFactor}, ${cfg.h / 2 - levelFactor})`,
        )
    }
  }

  function drawAxis() {
    const axis = svg
      .selectAll('.axis')
      .data(allAxis)
      .enter()
      .append('g')
      .attr('class', axisClassName)

    axis
      .append('line')
      .attr('x1', cfg.w / 2)
      .attr('y1', cfg.h / 2)
      .attr('x2', (j, i) => {
        maxAxisValues[i] = {
          x:
            (cfg.w / 2) *
            (1 - cfg.factor * Math.sin((i * cfg.radians) / total)),
          y: 0,
        }
        return maxAxisValues[i].x
      })
      .attr('y2', (j, i) => {
        maxAxisValues[i].y =
          (cfg.h / 2) * (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
        return maxAxisValues[i].y
      })
      .attr('class', lineClassName)
      .style('stroke', 'grey')
      .style('stroke-width', '1px')

    axis
      .append('text')
      .attr('class', legendClassName)
      .text((d) => d)
      .style('font-family', 'sans-serif')
      .style('font-weight', '500')
      .style('font-size', '16px')
      .style('fill', 'black')
      .attr('transform', (d, i) => {
        const dW = d.length

        switch (i) {
          case 0:
            return `translate(-${dW * 3}, -${dW * 4})`
          case 1:
            return `translate(-${dW * 7}, -${dW * 1})`
          case 2:
            return `translate(-${dW * 4}, ${dW * 5})`
          case 3:
            return `translate(-${dW * 2}, ${dW * 4})`
          case 4:
            return `translate(${dW * 3}, -${dW * 2})`
          default:
        }
        return 'translate(0, 0)'
      })
      .attr(
        'x',
        (d, i) =>
          (cfg.w / 2) *
            (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total)) -
          20 * Math.sin((i * cfg.radians) / total),
      )
      .attr(
        'y',
        (d, i) =>
          (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total)) +
          20 * Math.cos((i * cfg.radians) / total),
      )
  }

  function reCalculatePoints() {
    svg.selectAll('.nodes').data(data, (j, i) => {
      dataValues[i] = [
        radius *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total)),
        radius *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total)),
      ]
      return j.axis
    })
    dataValues[data.length] = dataValues[0]
  }

  function initPolygon() {
    return svg
      .selectAll('area')
      .data([dataValues])
      .enter()
      .append('polygon')
      .attr('class', radarClassName)
      .style('stroke-width', '2px')
      .style('stroke', cfg.color('0'))
      .style('stroke', radarColor)
      .on('mouseover', function (this: any) {
        const z = `polygon.${d3.select(this).attr('class')}`
        svg.selectAll('polygon').transition('200').style('fill-opacity', 0.1)
        svg.selectAll(z).transition('200').style('fill-opacity', 0.7)
      })
      .on('mouseout', () => {
        svg
          .selectAll('polygon')
          .transition('200')
          .style('fill-opacity', cfg.opacityArea)
      })
      .style('fill', () => cfg.color('0'))
      .style('fill-opacity', cfg.opacityArea)
      .style('fill', radarColor)
  }

  function drawPoly() {
    areagg.attr('points', (de) => {
      let str = ''
      for (let pti = 0; pti < de.length; pti++) {
        str = `${str}${de[pti][0]},${de[pti][1]} `
      }
      return str
    })
  }

  function drawNode() {
    svg
      .selectAll('.nodes')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', radarClassName)
      .attr('r', cfg.radius)
      .attr('alt', (j) => Math.max(j.value, 0))
      .attr(
        'cx',
        (j, i) =>
          (cfg.w / 2) *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total)),
      )
      .attr(
        'cy',
        (j, i) =>
          (cfg.h / 2) *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total)),
      )
      .attr('data-id', (j) => j.axis)
      .style('fill', radarColor)
      .style('fill-opacity', 0.9)
      .on('mouseover', function (this: any, d) {
        d3.select(this).style('cursor', 'pointer')

        const newX = parseFloat(d3.select(this).attr('cx')) - 10
        const newY = parseFloat(d3.select(this).attr('cy')) - 5
        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(d.value >> 0)
          .transition('200')
          .style('opacity', 1)
        const z = `polygon.${d3.select(this).attr('class')}`
        svg.selectAll('polygon').transition('200').style('fill-opacity', 0.1)
        svg.selectAll(z).transition('200').style('fill-opacity', 0.7)
      })
      .on('mouseout', () => {
        tooltip.transition('200').style('opacity', 0)
        svg
          .selectAll('polygon')
          .transition('200')
          .style('fill-opacity', cfg.opacityArea)
      })
      .call(d3.behavior.drag<DataPoint>().on('drag', move))
      .append('title')
      .text((j) => Math.max(j.value, 0))
  }

  function move(this: any, dobj: DataPoint, i: number) {
    const event = d3.event as d3.DragEvent

    this.parentNode.appendChild(this)
    const dragTarget = d3.select(this)

    const oldData = dragTarget.data()[0]
    const oldX = parseFloat(dragTarget.attr('cx')) - cfg.w / 2
    const oldY = cfg.h / 2 - parseFloat(dragTarget.attr('cy'))
    let newY = 0
    let newX = 0
    let newValue = 0

    const maxX = maxAxisValues[i].x - cfg.w / 2
    const maxY = cfg.h / 2 - maxAxisValues[i].y

    if (oldX === 0) {
      newY = oldY - event.dy
      if (Math.abs(newY) > Math.abs(maxY)) {
        newY = maxY
      }
      newValue = (newY / oldY) * oldData.value
    } else {
      const slope = oldY / oldX
      newX = event.dx + parseFloat(dragTarget.attr('cx')) - cfg.w / 2
      if (Math.abs(newX) > Math.abs(maxX)) {
        newX = maxX
      }
      newY = newX * slope

      const ratio = newX / oldX
      newValue = ratio * oldData.value
    }

    if (newValue <= 0) {
      return
    }

    dragTarget
      .attr('cx', () => newX + cfg.w / 2)
      .attr('cy', () => cfg.h / 2 - newY)
    data[oldData.order].value = newValue
    reCalculatePoints()
    drawPoly()
  }
}

export { drawRadarChart }