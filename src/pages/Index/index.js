import React, { Component } from 'react';
import { getSwiper, getGroups, getNews } from './api'
import { getCityLocation } from '../../utils/getCityIofo'
import {
  Carousel,
  Flex,
  Grid,
  WingBlank,
  NavBar,
  Icon
} from 'antd-mobile';
// 引入图片资源；格式为base64
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 引入css;
import './index.scss'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]

class Index extends Component {
  state = {
    // 轮播数据
    dataSwiper: [],
    // 宫格数据；
    dataGrid: [],
    // 最新资讯数据；
    dataNews: [],
    // 图片高度
    imgHeight: 176,
    // 自动轮播
    isloaded: false,
    // 城市地理位置；
    CityInfo: { label: '上海市' }
  }

  // 获取城市地理位置；
  getCityLocation = () => {
    getCityLocation((data) => {
      this.setState({
        CityInfo: { label: data.label, value: data.value }
      })
    })
  }
  // 获取轮播图数据；
  // loadSwiperData = async () => {
  //   const { data } = await getSwiper()
  //   data.status === 200 && this.setState({
  //     dataSwiper: data.body
  //   })
  // }

  // 获取宫格导航数据；
  // loadGridData = async () => {
  //   const { data } = await getGroups()
  //   data.status === 200 &&
  //     this.setState(() => {
  //       return {
  //         dataGrid: data.body
  //       }
  //     })
  // }

  // 获取最新资讯数据；
  // loadNews = async () => {
  //   const { data } = await getNews()
  //   data.status === 200 &&
  //     this.setState({
  //       dataNews: data.body
  //     })
  // }

  /**
   * 统一处理响应数据；
   * Promise.all可以将多个Promise实例包装成一个新的Promise实例。
   * 同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，
   * 而失败的时候则返回最先被reject失败状态的值。
   */
  DataResponse = async () => {
    const Data1 = getSwiper()
    const Data2 = getGroups()
    const Data3 = getNews()
    const res = await Promise.all([Data1, Data2, Data3])
    this.setState({
      dataSwiper: res[0].data.body,
      dataGrid: res[1].data.body,
      dataNews: res[2].data.body
    })
  }
  // 渲染轮播图；
  rendererSwiper = () => {
    return (
      this.state.dataSwiper.map(val => (
        <a
          key={val.id}
          href="http://www.alipay.com"
          style={{
            display: 'inline-block',
            width: '100%',
            height: this.state.imgHeight
          }}
        >
          <img
            src={`http://localhost:8080${val.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // 图片加载完毕后执行 onLoad 事件，根据窗口大小的变化自适应高度
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto', isloaded: true });
            }}
          />
        </a>
      ))
    )
  }

  // 渲染四个导航菜单；
  renderNavs = () => {
    return (
      navs.map(item => {
        return (
          // 元素的事件要先查看文档信息，根据文档使用事件，如果文档没有提供则尝试写原生的
          <Flex.Item
            className="nav"
            key={item.id}
            onClick={() => {
              // 点击跳转，用编程式导航；
              this.props.history.push(item.path)
            }}
          >
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </Flex.Item>
        )
      })
    )
  }

  // 租房小组；
  renderGroup = () => {
    return (
      // 空标签使用：功能类似template
      <>
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/* 宫格导航 */}
        <Grid
          square={false}
          data={this.state.dataGrid}
          columnNum={2}
          renderItem={dataItem => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{dataItem.title}</h3>
                <p>{dataItem.desc}</p>
              </div>
              <img src={`http://localhost:8080${dataItem.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </>
    )
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.dataNews.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`http://localhost:8080${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }

  // Dom挂载后执行，只执行一次
  componentDidMount() {
    this.DataResponse()
    // 获取城市地理位置；
    this.getCityLocation()
    // this.loadSwiperData()
    // this.loadGridData()
    // this.loadNews()
  }

  render() {
    return (
      <div>
        {/* 地理位置 */}
        <NavBar
          mode="dark"
          leftContent={this.state.CityInfo.label}
          onLeftClick={() => {
            this.props.history.push('/citylist')
          }}
          rightContent={[
            <Icon
              key="0"
              type="search"
              style={{ marginRight: '16px' }}
              onClick={() => {
                this.props.history.push('/map')
              }}
            />,
          ]}
        >首页</NavBar>

        {/* 自动播放问题解决：数据驱动视图 */}
        <Carousel autoplay={this.state.isloaded} infinite>
          {/* 轮播图 */}
          {this.rendererSwiper()}
        </Carousel>

        {/* 四个导航 */}
        <Flex>
          {this.renderNavs()}
        </Flex>

        {/* 租房小组 */}
        <div className="group">
          {this.renderGroup()}
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default Index;