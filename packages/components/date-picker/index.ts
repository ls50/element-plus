/*
 * @Description:
 * @Author: yt120763
 * @Date: 2022-12-10 14:09:10
 * @LastEditors: yt120763
 * @LastEditTime: 2022-12-10 16:24:58
 */
import DatePicker from './src/date-picker'

import type { App } from 'vue'
import type { SFCWithInstall } from '@element-plus/utils'

const _DatePicker = DatePicker as SFCWithInstall<typeof DatePicker>

console.log(typeof DatePicker)

_DatePicker.install = (app: App) => {
  app.component(_DatePicker.name, _DatePicker)
}

export default _DatePicker
export const ElDatePicker = _DatePicker
