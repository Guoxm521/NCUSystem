// 用户管理页面

import React from 'react'
import { Tabs } from 'antd';

import Student from './components/student/student'
import Worker from './components/worker/worker'

const { TabPane } = Tabs;

const PersonGroup: React.FC<{}> = (props) => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="学生管理" key="1">
          <Student />
        </TabPane>
        <TabPane tab="教工管理" key="2">
          <Worker />
        </TabPane>
      </Tabs>
    </>
  )
}

export default PersonGroup