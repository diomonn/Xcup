import dayjs from "dayjs"
import zh_cn from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeData  from 'dayjs/plugin/localeData'
dayjs.locale(zh_cn)
const Getday=(a:any):string=>{
  return `${dayjs(a).year()}年${dayjs(a).month()}月${dayjs(a).date()-1}日  ${dayjs(a).hour()}:${dayjs(a).minute()}:${dayjs(a).second()}`
}
const DateDifference=(a:any):string=>{
  dayjs.extend(relativeTime)
  dayjs.extend(localeData )
  return dayjs(a).fromNow()
}
export {
  Getday,
  DateDifference
}
