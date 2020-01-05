import React, { Component } from 'react';
import { NavBar, Icon, Toast  } from 'antd-mobile';
import { getAreaCity, getHotCity } from './api'
import { getCityLocation } from '../../utils/getCityIofo'
import { List, AutoSizer } from 'react-virtualized'
import { setLocalCity } from '../../utils/localStorage'
import './index.scss'


class Citylist extends Component {

  state = {
    /**
     * 默认为空用于列表渲染的判断；
     * 数据为空时列表不渲染；
     */
    CityLists: {},
    CityIndexs: []
  }

  // 获取城市列表数据
  loadAreaCity = async () => {
    // 获取全部城市数据
    const { data } = await getAreaCity()
    // 对响应的数据进行处理
    const { CityLists, CityIndexs } = this.formatData(data)
    // 获取热点城市数据；
    const { data: HotCity } = await getHotCity()
    // 把热点城市数据和城市的信息，添加到全部城市数据中；
    CityLists['hot'] = HotCity.body
    CityIndexs.unshift('hot')
    // 获取定位城市的信息；
    getCityLocation((data) => {
      // 添加到全部城市数据中
      CityLists['#'] = [data]
      CityIndexs.unshift('#')
    })
    this.setState(() => {
      return {
        CityLists,
        CityIndexs
      }
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
        // 若对象中没有则添加一条新数据进去
        CityLists[letter] = [Item]
      } else {
        // 若有则追加
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

  // { key, index, style } 为组件提供的默认参数
  rowRenderer = ({ key, index, style }) => {
    const { CityLists, CityIndexs } = this.state
    const letter = CityIndexs[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{letter}</div>
        {/* 循环遍历每一个标题下面的城市 */}
        {
          CityLists[letter].map((item) => {
            return (
              <div
                key={item.value}
                className="name"
                onClick={() => {
                  // 后台有房源的城市只有 北上广深
                  if (['北京', '上海', '深圳', '广州'].includes(item.label)) {
                    // 修改本地存储的城市: 点击定位到点击的城市；
                    setLocalCity('hkzf_curr_Iofo', item)
                    // 回到上一页
                    this.props.history.goBack()
                  } else {
                    // 提示暂无房源
                    Toast.info('该城市暂无房源,敬请期待', 2)
                  }
                }}
              >
                {item.label}
              </div>
            )
          })
        }
      </div>
    )
  }

  // 计算列表的行高；
  // ({ index: number }): number
  calRowHeight = ({ index }) => {
    const { CityLists, CityIndexs } = this.state
    // H = 标题高+个数*每个城市高度
    const letter = CityIndexs[index]
    return 36 + CityLists[letter].length * 50
  }

  componentDidMount() {
    this.loadAreaCity()
  }

  render() {
    return (
      <div className="citylist">
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
        <AutoSizer>
          {
            ({ height, width }) => {
              // 数组存在且不等于零时，渲染列表
              return (
                this.state.CityIndexs &&
                this.state.CityIndexs.length !== 0 &&
                (
                  <List
                    width={width}
                    height={height}
                    rowCount={this.state.CityIndexs.length}
                    rowHeight={this.calRowHeight}
                    rowRenderer={this.rowRenderer}
                  />
                )
              )
            }
          }
        </AutoSizer>
      </div>
    );
  }
}

export default Citylist;