/**
 * 组件对应的请求api
 */

import http from '../../utils/http'


/**
 * 获取城市列表数据
 */
export const getAreaCity = () => {
  return http.get(`/area/city?level=1`)
}

/**
 * 获取热点城市数据
 */
export const getHotCity = () => {
  return http.get(`/area/hot`)
}

/**
 * 根据城市名称查询该城市信息
 */
export const getCityIofo = (label) => {
  return http.get(`/area/info?name=${label}`)
}

