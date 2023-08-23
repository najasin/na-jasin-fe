/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable func-names */

/* eslint-disable no-bitwise */

/* eslint-disable prefer-destructuring */

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as d3 from 'd3'

import { DataPoint } from '../radarChart.types'
import { defaultOffsetRatioMap } from './axis.helpers'

/**
 *
 * @param {string} elementId svg를 담는 wrapper element의 id
 * @param {string} lineClassName line element의 class
 * @param {string} axisClassName axis element의 class
 * @param {string} legendClassName legend element의 class
 * @param {string} radarClassName radar element의 class
 * @param {boolean} isDefault 유저가 입력한 기본 도형인지 아닌지
 * @param {DataPoint[]} data radar data
 * @param {string} radarColor radar color
 * @param {number} radarWidth radar width
 * @param {number} radarHeight radar height
 * @param {number} radarPadding radar padding
 */
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
  onDragOutUserInput: (data: DataPoint[]) => void,
  isViewPolygon: boolean,
  isPossibleDrawNode: boolean,
) => {
  // 기본 설정 값을 관리한다.
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

  // cfg.maxValue = Math.max(cfg.maxValue, d3.max(data.map((o) => o.value)))
  cfg.maxValue = 100

  const allAxis = data.map((i) => i.axis)
  const total = allAxis.length
  const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2)

  d3.select(elementId).select('svg').remove()

  // radar를 담을 svg를 등록한다.
  const svg = d3
    .select(elementId)
    .append('svg')
    .attr('width', cfg.w + radarPadding)
    .attr('height', cfg.h + radarPadding)
    .append('g')
    .attr('transform', `translate(${radarPadding / 2}, ${radarPadding / 2})`)

  // tooltip으로 현재 값을 보여준다.
  const tooltip = svg.append('text').style('opacity', 0).style('font-size', 13)

  // isDefault일 때는 polygon만 그리며, drag 핸들러를 동작시키지 않는다.
  !isDefault && drawFrame()
  const maxAxisValues: Array<{ x: number; y: number }> = []
  !isDefault && drawAxis()
  const dataValues: Array<[number, number]> = []
  reCalculatePoints()

  const areagg = initPolygon()
  isViewPolygon && drawPoly() // draw 가능 여부

  !isDefault && isPossibleDrawNode && drawNode() // 조정 가능 여부

  // 초기에 frame을 그린다.
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
        // .style('opacity', 0.1) // 초기 투명도 설정
        .attr(
          'transform',
          `translate(${cfg.w / 2 - levelFactor}, ${cfg.h / 2 - levelFactor})`,
        )
      // .transition() // 애니메이션 효과 적용
      // .duration(1000) // 애니메이션 지속 시간 설정
      // .style('opacity', 1) // 투명도를 0에서 1로 변경하여 나타나게 함
    }
  }

  // 초기에 axis 그린다.
  function drawAxis() {
    const axis = svg
      .selectAll('.axis')
      .data(allAxis)
      .enter()
      .append('g')
      .attr('class', axisClassName)

    axis
      .append('line')
      // .style('opacity', 0.1) // 초기 투명도 설정
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
    // .transition() // 애니메이션 효과 적용
    // .duration(1000) // 애니메이션 지속 시간 설정
    // .style('opacity', 1) // 투명도를 0에서 1로 변경하여 나타나게 함

    const initialTextPositions: Array<{
      cX: number
      cY: number
      offsetX: number
      offsetY: number
    }> = [] // 초기 텍스트 엘리먼트 위치 저장용 배열

    axis
      .append('text')
      .attr('class', legendClassName)
      .text((d) => d)
      .attr('text-anchor', 'middle')
      .style('font-weight', '400')
      .style('font-size', '16px')
      .style('fill', 'black')
      .each(function (this: any, d, i) {
        const bbox = this.getBBox()
        const cX = bbox.x + bbox.width / 2
        const cY = bbox.y + bbox.height / 2

        initialTextPositions.push({
          cX,
          cY,
          offsetX: defaultOffsetRatioMap[i].offsetXRatio * cfg.w,
          offsetY: defaultOffsetRatioMap[i].offsetYRatio * cfg.h,
        })
      })
      .attr('transform', (d, i) => {
        const initialPosition = initialTextPositions[i]
        return `translate(${initialPosition.cX + initialPosition.offsetX},${
          initialPosition.cY + initialPosition.offsetY
        })`
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

  // 드래그할 때마다 point 위치를 계산해준다.
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

  // 초기에 polygon을 그린다.
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

  // polygon layout을 그린다.
  function drawPoly() {
    areagg.attr('points', (de) => {
      let str = ''
      for (let pti = 0; pti < de.length; pti++) {
        str = `${str}${de[pti][0]},${de[pti][1]} `
      }
      return str
    })
  }

  // point node를 그린다.
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
          .attr(
            'transform',
            `rotate(${
              (-cfg.radians / total) * d.order * (180 / Math.PI)
            }, ${newX}, ${newY})`,
          ) // 툴팁 텍스트 반대 회전
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
      .call(
        d3.behavior.drag<DataPoint>().on('drag', move).on('dragend', moveEnd),
      ) // 드래그 시 move 함수 실행, 드래그 끝났을 때 moveEnd 함수 실행
      .append('title')
      .text((j) => Math.max(j.value, 0))
  }

  function moveEnd() {
    // 유저가 변경한 데이터 불변성 유지
    const changedData = data.map(({ axis, value, order }) => ({
      axis,
      value: value >> 0,
      order,
    }))
    onDragOutUserInput(changedData)
  }

  // drag 시 위치를 계산해준다.
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

    // 0보다 작아졌을 때 멈춘다.
    if (newValue <= 25) {
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
