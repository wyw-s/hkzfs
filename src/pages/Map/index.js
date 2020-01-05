import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './index.css'

class index extends Component {

  componentDidMount() {
    const { BMap } = window
    const map = new BMap.Map("container");
    const point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    console.log("wwww");
  }

  render() {
    return (
      <div className="map">
        {/* 地图导航 */}
        <NavBar
          icon={(<Icon type={"left"} />)}
          mode="dark"
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          地图导航
        </NavBar>

        {/* 地图 */}
        <div id="container"></div>
      </div>
    );
  }
}

export default index;