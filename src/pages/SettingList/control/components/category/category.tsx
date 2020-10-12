// 应用类别管理组件

import React, { FC, useState } from 'react';
import { Button, Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './department.less';

const tableData = [
  {
    key: '1',
    iconID: '00001',
    typeName: '注册登记',
    sort: 1
  },
  {
    key: '2',
    iconID: '00002',
    typeName: '社团管理',
    sort: 2
  },
  {
    key: '3',
    iconID: '00003',
    typeName: '成员管理',
    sort: 3
  },
  {
    key: '4',
    iconID: '00004',
    typeName: '考核管理',
    sort: 4
  },
  {
    key: '5',
    iconID: '00005',
    typeName: '活动管理',
    sort: 5
  },
  {
    key: '6',
    iconID: '00006',
    typeName: '新媒体管理',
    sort: 6
  },
  {
    key: '7',
    iconID: '00007',
    typeName: '经费管理',
    sort: 7
  },
  {
    key: '8',
    iconID: '00008',
    typeName: '个人页',
    sort: 8
  },
  {
    key: '9',
    iconID: '00009',
    typeName: '社团大数据',
    sort: 9
  },
  {
    key: '10',
    iconID: '00010',
    typeName: '系统设置',
    sort: 10
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const Category: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'category/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Card  bordered={false}>
        <Form.Item name="members">
          <TableForm />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['category/submitAdvancedForm'],
}))(Category);


