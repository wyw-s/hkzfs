import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
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
    titleSelectedStatus,
    openType: ''
  }
  // 点击高亮
  onTitleClick = type => {
    this.setState({
      // 对象展开和对象成员不重复的应用
      titleSelectedStatus: { ...this.state.titleSelectedStatus, [type]: true },
      openType: type
    })
  }
  render() {
    const { openType, titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {openType === 'area' || openType === 'mode' || openType === 'price' ? (
          <div className={styles.mask} />
        ) : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />

          {openType === 'area' ||
          openType === 'mode' ||
          openType === 'price' ? (
            <FilterPicker />
          ) : null}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
