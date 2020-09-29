// 部门设置页面

import React, { FC, useState } from 'react';
import { Button, Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './department.less';

const tableData = [
  {
    key: '1',
    departmentID: '00001',
    departmentName: '信息工程学院',
    departmentType: '学院',
    sort: 1
  },
  {
    key: '2',
    departmentID: '00002',
    departmentName: '医学院',
    departmentType: '学院',
    sort: 2
  },
  {
    key: '3',
    departmentID: '00003',
    departmentName: '食品学院',
    departmentType: '学院',
    sort: 3
  },
  {
    key: '4',
    departmentID: '00004',
    departmentName: '建筑工程学院',
    departmentType: '学院',
    sort: 4
  },
  {
    key: '5',
    departmentID: '00005',
    departmentName: '通信工程学院',
    departmentType: '学院',
    sort: 5
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const Department: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'department/submitAdvancedForm',
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
      <Card title="部门列表" bordered={false}>
        <Form.Item name="members">
          <TableForm />
        </Form.Item>
      </Card>
      <FooterToolbar>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['department/submitAdvancedForm'],
}))(Department);

