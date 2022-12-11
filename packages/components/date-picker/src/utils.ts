import dayjs from 'dayjs'
import { isArray } from '@element-plus/utils'

import type { Dayjs } from 'dayjs'
import type { DateCell } from './date-picker.type'

type DayRange = [Dayjs | undefined, Dayjs | undefined]
// 是否是有效的range 左右同时存在，且不能相等左侧要在右侧之前
export const isValidRange = (range: DayRange): boolean => {
  if (!isArray(range)) return false

  const [left, right] = range

  return (
    dayjs.isDayjs(left) && dayjs.isDayjs(right) && left.isSameOrBefore(right)
  )
}

type GetDefaultValueParams = {
  lang: string
  unit: 'month' | 'year'
  unlinkPanels: boolean
}

export type DefaultValue = [Date, Date] | Date | undefined

export const getDefaultValue = (
  defaultValue: DefaultValue,
  { lang, unit, unlinkPanels }: GetDefaultValueParams
) => {
  let start: Dayjs
  // 数组 默认值等于结尾等于开始加上+1
  if (isArray(defaultValue)) {
    let [left, right] = defaultValue.map((d) => dayjs(d).locale(lang))
    if (!unlinkPanels) {
      right = left.add(1, unit)
    }
    return [left, right]
    // 默认值存在 自动设置为left
  } else if (defaultValue) {
    start = dayjs(defaultValue)
    // 无 当前日期
  } else {
    start = dayjs()
  }
  start = start.locale(lang)
  return [start, start.add(1, unit)]
}
// 范围 行和列
type Dimension = {
  row: number
  column: number
}

type BuildPickerTableMetadata = {
  startDate?: Dayjs | null
  unit: 'month' | 'day'
  columnIndexOffset: number
  now: Dayjs
  nextEndDate: Dayjs | null
  relativeDateGetter: (index: number) => Dayjs
  setCellMetadata?: (
    cell: DateCell,
    dimension: { rowIndex: number; columnIndex: number }
  ) => void
  setRowMetadata?: (row: DateCell[]) => void
}

export const buildPickerTable = (
  dimension: Dimension, // 几行和几列
  rows: DateCell[][],
  {
    columnIndexOffset,
    startDate,
    nextEndDate,
    now,
    unit,
    relativeDateGetter,
    setCellMetadata,
    setRowMetadata,
  }: BuildPickerTableMetadata
) => {
  // 行数据 7*7
  for (let rowIndex = 0; rowIndex < dimension.row; rowIndex++) {
    const row = rows[rowIndex]
    // 列数据
    for (let columnIndex = 0; columnIndex < dimension.column; columnIndex++) {
      // columnIndexOffset 怎么计算出来的？
      // cell的用列的索引和偏移的值来计算
      let cell = row[columnIndex + columnIndexOffset]
      if (!cell) {
        cell = {
          row: rowIndex, // 所在行
          column: columnIndex, // 列索引
          type: 'normal',
          inRange: false,
          start: false,
          end: false,
        }
      }
      // 计算当前cell的在整个row里面的索引
      // 公式 当前行的索引*总列数+当前cell在列中的索引 rowIndex是从0行开始的
      // 第七行第二列的索引应该为 6*7+1 = 43
      const index = rowIndex * dimension.column + columnIndex
      const nextStartDate = relativeDateGetter(index) // ?? 根据索引返回对应dayjs 对象=>日期
      cell.dayjs = nextStartDate
      cell.date = nextStartDate.toDate()
      cell.timestamp = nextStartDate.valueOf()
      cell.type = 'normal'
      // startDate nextStartDate nextEndDate
      // 应该是判断当前这个cell是否在range的范围之内
      cell.inRange =
        // startDate <= nextStartDate <= nextEndDate
        !!(
          startDate &&
          nextStartDate.isSameOrAfter(startDate, unit) &&
          nextEndDate &&
          nextStartDate.isSameOrBefore(nextEndDate, unit)
        ) ||
        // nextEndDate <= nextStartDate <= startDate
        !!(
          startDate &&
          nextStartDate.isSameOrBefore(startDate, unit) &&
          nextEndDate &&
          nextStartDate.isSameOrAfter(nextEndDate, unit)
        )
      // 计算产生 cell.start和cell.end
      // startDate >= nextEndDate
      if (startDate?.isSameOrAfter(nextEndDate)) {
        cell.start = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit)
        cell.end = startDate && nextStartDate.isSame(startDate, unit)
      } else {
        cell.start = !!startDate && nextStartDate.isSame(startDate, unit)
        cell.end = !!nextEndDate && nextStartDate.isSame(nextEndDate, unit)
      }
      // 当前 假设今天是2022-12-09 这个cell的类型就是today
      const isToday = nextStartDate.isSame(now, unit)

      if (isToday) {
        cell.type = 'today'
      }
      setCellMetadata?.(cell, { rowIndex, columnIndex })
      row[columnIndex + columnIndexOffset] = cell
    }
    setRowMetadata?.(row)
  }
}
