// 应用管理组件

import React, { FC, useState } from 'react';
import { Button, Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './department.less';

const tableData = [
  {
    key: '1',
    icon: '00001',
    number: '1',
    appName: '测试应用1',
    appType: '应用类别1',
    appPath: 'www.google.com',
  },
  {
    key: '2',
    icon: '00002',
    number: '2',
    appName: '测试应用2',
    appType: '应用类别2',
    appPath: 'www.baidu.com',
  },
  {
    key: '3',
    icon: '00003',
    number: '3',
    appName: '测试应用3',
    appType: '应用类别3',
    appPath: 'www.taobao.com',
  },
  {
    key: '4',
    icon: '00004',
    number: '4',
    appName: '测试应用4',
    appType: '应用类别4',
    appPath: 'www.bilibili.com',
  }
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const Control: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'control/submitAdvancedForm',
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
      <Card bordered={false}>
        <Form.Item name="members">
          <TableForm />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['control/submitAdvancedForm'],
}))(Control);



