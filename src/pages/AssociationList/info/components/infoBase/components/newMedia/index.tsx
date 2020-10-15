// 新媒体平台登记 组件

import React from 'react'
import { Button, Card, Form } from 'antd';

import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';

const tableData = [
  {
    key: '1',
    platformName: '信息工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.baidu.com'
  },
  {
    key: '2',
    platformName: '医学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.tianmao.com'
  },
  {
    key: '3',
    platformName: '食品学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.jindong.com'
  },
  {
    key: '4',
    platformName: '建筑工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.aidagou.com'
  },
  {
    key: '5',
    platformName: '通信工程学院',
    typeOf: '100',
    QRCode: '',
    URLPath: 'www.google.com'
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

const NewMedia: React.FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'NewMediaModel/submitAdvancedForm',
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
  submitting: loading.effects['NewMediaModel/submitAdvancedForm'],
}))(NewMedia);