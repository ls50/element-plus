/*
 * @Description:
 * @Author: yt120763
 * @Date: 2022-12-10 14:09:10
 * @LastEditors: yt120763
 * @LastEditTime: 2022-12-10 19:43:14
 */
export const timeUnits = ['hours', 'minutes', 'seconds'] as const

export const DEFAULT_FORMATS_TIME = 'HH:mm:ss'
export const DEFAULT_FORMATS_TIME_SELECT = 'HH:mm'
export const DEFAULT_FORMATS_DATE = 'YYYY-MM-DD'
export const DEFAULT_FORMATS_DATEPICKER = {
  date: DEFAULT_FORMATS_DATE,
  dates: DEFAULT_FORMATS_DATE,
  week: 'gggg[w]ww',
  year: 'YYYY',
  month: 'YYYY-MM',
  datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  monthrange: 'YYYY-MM',
  daterange: DEFAULT_FORMATS_DATE,
  datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
  datetimerangeselect: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME_SELECT}`,
}

export type TimeUnit = typeof timeUnits[number]
