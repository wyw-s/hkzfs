/**
 * 组件对应的请求api
 */

import http from '../../../../utils/http'

/**
 * 轮播图
 */
export const getHousesCondition = (Id = `AREA|88cff55c-aaa4-e2e0`) => {
  return http.get(`/houses/condition?id=${Id}`)
}


