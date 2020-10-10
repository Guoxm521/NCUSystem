import React from 'react';
import { Modal, Form, Input, Row, Col, Button, Space } from 'antd';
import UploadView from './uploadView'

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const FormItem = Form.Item

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
        title="新增用户"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={<TestList />}
      >
        <Form labelCol={{span: 7}} onFinish={test}>
          <Row>
            <Col span={12}>
              <FormItem name='userName' label="姓名">
                <Input />
              </FormItem>
              <FormItem name='studentId' label="学号">
                <Input />
              </FormItem>
              <FormItem name='sex' label="性别">
                <Input />
              </FormItem>
              <FormItem name='birthPlace' label="籍贯">
                <Input />
              </FormItem>
              <FormItem name='IdCard' label="身份证号">
                <Input />
              </FormItem>
              <FormItem name='departmentId' label="部门号">
                <Input />
              </FormItem>
              <FormItem name='classId' label="班级">
                <Input />
              </FormItem>
              <FormItem name='phone' label="手机号">
                <Input />
              </FormItem>
              <FormItem name='political' label="政治面貌">
                <Input />
              </FormItem>
            </Col>
            <Col span={8} offset={4}>
              <FormItem name='photo' label="证件照">
                <UploadView name={"photo"} title={"证件照"} />
              </FormItem>
              <FormItem name='profile' label="头像">
                <UploadView name={"profile"} title={"头像"} />
              </FormItem>
            </Col>
          </Row>
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
