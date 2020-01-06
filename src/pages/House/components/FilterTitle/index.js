import React from 'react'

import { Flex } from 'antd-mobile'

/**
 * css样式也可以导入，导入后，类名为属性，以对象的形式使用；
 */
import styles from './index.module.css'


// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle() {
  return (
    <Flex align="center" className={styles.root}>
      {
        titleList.map(item => {
          return (
            <Flex.Item key={ item.type }>
              {/* 选中类名： selected */}
              <span className={[styles.dropdown, styles.selected].join(' ')}>
                <span>{item.title}</span>
                <i className="iconfont icon-arrow" />
              </span>
            </Flex.Item>
          )
        })
      }
    </Flex>
  )
}
