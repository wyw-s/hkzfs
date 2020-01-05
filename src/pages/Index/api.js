/**
 * 组件对应的请求api
 */

import http from '../../utils/http'

/**
 * 轮播图
 */
export const getSwiper = () => {
  return http.get('/home/swiper')
}

/**
 * 宫格数据
 */
export const getGroups = (area=`AREA|88cff55c-aaa4-e2e0`) => {
  return http.get(`/home/groups?area=${area}`)
}

/**
 * 最新资讯数据
 */
export const getNews = (area=`AREA|88cff55c-aaa4-e2e0`) => {
  return http.get(`/home/news?area=${area}`)
}

/**
 * 根据城市名称查询该城市信息
 */
export const getCityIofo = (label) => {
  return http.get(`/area/info?name=${label}`)
}
