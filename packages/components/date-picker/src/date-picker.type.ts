/*
 * @Description:
 * @Author: yt120763
 * @Date: 2022-12-10 14:09:10
 * @LastEditors: yt120763
 * @LastEditTime: 2022-12-10 19:23:27
 */
import type { Dayjs } from 'dayjs'

export declare type IDatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
  | 'datetimerangeselect'

type DateCellType = 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
export interface DateCell {
  column?: number
  customClass?: string
  disabled?: boolean
  end?: boolean
  inRange?: boolean
  row?: number
  selected?: Dayjs
  isCurrent?: boolean
  isSelected?: boolean
  start?: boolean
  text?: number
  timestamp?: number
  date?: Date
  dayjs?: Dayjs
  type?: DateCellType
}
