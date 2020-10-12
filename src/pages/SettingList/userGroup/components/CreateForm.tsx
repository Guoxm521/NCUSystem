import React from 'react';
import { Modal, Form, Input, Row, Col, Upload, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item
const InputArea = Input.TextArea

const TestList = () => {
  return (
    <div>
      <FormItem>
        <Space>
          <Button type="default">取消</Button>
          <Button type="primary" htmlType="submit">提交</Button>
        </Space>
      </FormItem>
    </div>
  )
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props;

  const test = (e: any) => {
    console.log(e)
  }

  return (
      <Modal
        destroyOnClose
        title="用户组"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={<TestList />}
      >
        <Form onFinish={test} layout={"vertical"}>
          <FormItem
            name={"name"}
            label={"用户组名称"}
          >
            <Input />
          </FormItem>
          <FormItem
            name={"desc"}
            label={"描述"}
          >
            <InputArea rows={4} maxLength={1000} />
          </FormItem>
          {/* <Row>
            <Col offset={17}>
              <FormItem>
                <Space>
                  <Button type="default">取消</Button>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Space>
              </FormItem>
            </Col>
          </Row> */}
          </Form>
        {/* {props.children} */}
      </Modal>
  );
};

export default CreateForm;
