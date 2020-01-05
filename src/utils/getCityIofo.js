import { getCityIofo } from '../pages/Index/api'
import { getLocalCity, setLocalCity } from '../utils/localStorage'

/**
 * 根据城市名称查询该城市信息
 * 如果用户再当前城市获取过地理位置后，那么后面就不需要再重新获取了，
 * 所以需要把城市信息存储到本地使用；
 */
export const getCityLocation = (cb) => {
  // 获取本地数据信息；
  let CityIofo = getLocalCity('hkzf_curr_Iofo')
  // 判断本地的信息是否存在；
  if (!CityIofo) {
    const { BMap } = window
    var myCity = new BMap.LocalCity()
    myCity.get(async (result) => {
      // 获取当前的地位城市；
      const cityName = result.name
      // 获取定位城市的信息；
      const { data } = await getCityIofo(cityName)
      cb(data.body)
      // 本地的信息不存在则把最新的城市信息保存起来；
      setLocalCity('hkzf_curr_Iofo', data.body)
    });
  } else {
    cb(CityIofo)
  }
}