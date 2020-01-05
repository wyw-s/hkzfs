/**
 * 储存本地城市信息
 */

 // 获取本地数据
 export const getLocalCity = (val) => {
  return JSON.parse(window.localStorage.getItem(val))
 }

 // 存储本地数据；
 export const setLocalCity = (val, data) => {
  window.localStorage.setItem(val, JSON.stringify(data)) 
 }

 // 删除本地数据；
 export const removeCity = (val) => {
   window.localStorage.removeItem(val)
 }