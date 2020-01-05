import React, { Component } from 'react';
import { NavBar, Icon, List } from 'antd-mobile';
import { getAreaCity, getHotCity } from './api'
import { getCityLocation } from '../../utils/getCityIofo'

class Citylist extends Component {

  // 获取城市列表数据
  loadAreaCity = async () => {
    // 获取全部城市数据
    const { data } = await getAreaCity()
    // 对响应的数据进行处理
    const { CityLists, CityIndexs } = this.formatData(data)
    // 获取热点城市数据；
    const { data: HotCity } = await getHotCity()
    // 把热点城市数据和城市的信息，添加到全部城市数据中；
    CityLists['hot'] = [HotCity.body]
    CityIndexs.unshift('hot')
    // 获取定位城市的信息；
    getCityLocation((data) => {
      // 添加到全部城市数据中
      CityLists['#'] = [data]
      CityIndexs.unshift('#')
    })
  }

  // 处理响应数据；
  formatData = ({ body }) => {
    // 所有城市的数据信息
    let CityLists = {}
    // 辅助查询用的数组；
    let CityIndexs = []
    body.forEach(Item => {
      // 截取字符串，获取首字母；
      const letter = Item.short.substr(0, 1)
      // 把城市信息进行分组；
      if (!CityLists[letter]) {
        // 若对象中没有则添加一条数据进去
        CityLists[letter] = [Item]
      } else {
        CityLists[letter].push(Item)
      }
    });
    // Object.keys(对象) 可以取出对象中所有的Key，sort()对数组进行排序
    CityIndexs = Object.keys(CityLists).sort()
    return {
      CityLists,
      CityIndexs
    }
  }

  componentDidMount() {
    this.loadAreaCity()
  }

  render() {
    return (
      <div>
        {/* 导航栏 */}
        <NavBar
          icon={(<Icon type={"left"} />)}
          mode="dark"
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          城市选择
        </NavBar>
        {/* 城市列表 */}
        <List renderHeader={() => 'Basic Style'} className="my-list">
          <List.Item extra={'extra content'}>Title</List.Item>
        </List>
      </div>
    );
  }
}

export default Citylist;