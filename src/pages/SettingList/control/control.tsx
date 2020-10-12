// 应用管理 页面

import React from 'react'
import { Tabs } from 'antd';

import Control from './components/control/control'
import Category from './components/category/category'


const { TabPane } = Tabs;

const ControlPage: React.FC<{}> = (props) => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="应用管理" key="1">
          <Control />
        </TabPane>
        <TabPane tab="类别管理" key="2">
          <Category />
        </TabPane>
      </Tabs>
    </>
  )
}

export default ControlPage