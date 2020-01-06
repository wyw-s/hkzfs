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

  // 点击取消隐藏组件
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

   // 点击保存隐藏组件
   onSave = () => {
    this.setState({
      openType: ''
    })
  }

  render() {
    const { openType, titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {openType === 'area' || openType === 'mode' || openType === 'price' ?
          (<div className={styles.mask} onClick={this.onCancel} />) :
          null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />

          {openType === 'area' ||
            openType === 'mode' ||
            openType === 'price' ? (
              <FilterPicker onCancel={ this.onCancel } onSave={this.onSave}/>
            ) : null}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
