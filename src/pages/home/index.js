import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
// 引入TabBar
import {TabBar} from 'antd-mobile';
// 引入二级路由组件；
import Index from '../Index'
import Profile from '../Profile'
import HouseList from '../House'
// 引入字体图标；
import '../../assets/fonts/iconfont.css'
// 引入底部导航栏数据；
import { tabbars } from './tabbar.json'
import './index.css'

// TabBar 数据 由于此数据不会改动，所以可以用数组设置成固定的数据

class Home extends Component {
  state = {
    // selectedTab: '/home/index',
    // 把默认的设置为动态，是因为如果在my页面那么刷新页面应该在当前页；
    selectedTab: this.props.location.pathname,
  }

  // 底部导航栏
  renderTabBar = () =>
    (<TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={this.state.hidden}
    >
      {
        tabbars.map((Item) => {
          return (
            <TabBar.Item
              title={Item.title}
              key={Item.key}
              icon={<div className={`iconfont ${Item.icon}`} />}
              selectedIcon={<div className={`iconfont ${Item.icon}`} />}
              selected={this.state.selectedTab === Item.path}
              // 只要点击此事件就会触发；
              onPress={() => {
                console.log(this.props, Item.path);
                this.props.history.push(Item.path)
                this.setState({
                  selectedTab: Item.path,
                });
              }}
            >
            </TabBar.Item>
          )
        })
      }
    </TabBar >
    )

  render() {
    // 由于当前组件有 route 包裹 所以有会多一些属性；
    // console.log(this.props);
    return (
      <div>
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path="/home/list" component={HouseList}></Route>
          <Route path="/home/profile" component={Profile}></Route>
        </Switch>
        {/* 
          <Link to="/home/index">首页</Link>
          <Link to="/home/house">房屋列表</Link>
          <Link to="/home/Profile">个人中心</Link>
        */}

        {/* 底部导航栏 */}
        <div className="tabbar">
          {this.renderTabBar()}
        </div>
      </div>
    );
  }
}

export default Home;