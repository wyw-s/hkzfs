import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
// import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

import styles from './index.module.css'

// 标题高亮状态
const titleSelectedStatus = {
  area: false,
  mode: true,
  price: false,
  more: false
}

export default class Filter extends Component {
  state = {
    titleSelectedStatus
  }
  // 点击高亮
  onTitleClick = type => {
    this.setState({
      // 对象展开和对象成员不重复的应用
      titleSelectedStatus: { ...this.state.titleSelectedStatus, [type]: true }
    })
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
