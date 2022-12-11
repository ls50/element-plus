/*
 * @Description:
 * @Author: yt120763
 * @Date: 2022-12-11 11:53:33
 * @LastEditors: yt120763
 * @LastEditTime: 2022-12-11 12:03:36
 */
export const datePickTypes = [
  'year',
  'month',
  'date',
  'dates',
  'week',
  'datetime',
  'datetimerange',
  'daterange',
  'monthrange',
  'datetimerangeselect',
] as const

export const WEEK_DAYS = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
] as const

export type DatePickType = typeof datePickTypes[number]
