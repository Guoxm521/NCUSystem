// 机构设置 组件

import React from 'react'
import { Button, Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';

const tableData = [
  {
    key: '1',
    departmentName: '信息工程学院',
    departmentMember: '100',
    sort: 1
  },
  {
    key: '2',
    departmentName: '医学院',
    departmentMember: '100',
    sort: 2
  },
  {
    key: '3',
    departmentName: '食品学院',
    departmentMember: '100',
    sort: 3
  },
  {
    key: '4',
    departmentName: '建筑工程学院',
    departmentMember: '100',
    sort: 4
  },
  {
    key: '5',
    departmentName: '通信工程学院',
    departmentMember: '100',
    sort: 5
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const Organization: React.FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'OrganizationModel/submitAdvancedForm',
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
      <FooterToolbar>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['OrganizationModel/submitAdvancedForm'],
}))(Organization);