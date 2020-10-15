// 基本信息 组件

import { Button, Input, Form, message, Modal } from 'antd';
import { FormattedMessage, formatMessage} from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import UploadView from '@/components/UploadView/uploadView'
import styles from './BaseView.less';

interface BaseViewProps {
  currentUser?: CurrentUser;
}

interface BaseViewState {
  visible: boolean
  [name: string]: any
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

class BaseInfo extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (e:any) => {
    message.success(formatMessage({ id: 'setting.basic.update.success' }));
    console.log(e)
  };

  test = (e: any) => {
    console.log(e)
  }

  testOne = (e: any) => {
    console.log(e)
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <Form
          layout={"horizontal"}
          onFinish={this.handleFinish}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            {...formItemLayout}
            name={"logo"}
            label={formatMessage({ id: 'info.infoBase.logo'})}
          >
            <UploadView id="logoImg" name="logo" title="学校LOGO" onChange={this.testOne.bind(this)} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"fullname-cn"}
            label={formatMessage({ id: 'info.infoBase.fullname-cn' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.fullname-cn-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入社团中文全称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"fullname-en"}
            label={formatMessage({ id: 'info.infoBase.fullname-en' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.fullname-en-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入社团英文全称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"typeof"}
            label={formatMessage({ id: 'info.infoBase.typeof' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.typeof-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入社团类别" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"level"}
            label={formatMessage({ id: 'info.infoBase.level' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.level-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入社团级别" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"department"}
            label={formatMessage({ id: 'info.infoBase.department' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.department-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入指导部门" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"member"}
            label={formatMessage({ id: 'info.infoBase.member' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.member-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入成员数量" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"regulations"}
            label={formatMessage({ id: 'info.infoBase.regulations' })}
          >
            <UploadView id="regulations" name="regulations" title="regulations" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"startTime"}
            label={formatMessage({ id: 'info.infoBase.startTime' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'info.infoBase.startTime-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入成立时间" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"syssimpleimg"}
            label={formatMessage({ id: 'info.infoBase.syssimpleimg' })}
          >
            <UploadView id="backgroundImg" name="background" title="登录页背景" />
          </Form.Item>
          <Form.Item
            {...submitFormLayout}
          >
            <div>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="setting.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </div>
          </Form.Item>
        </Form>
        <Modal
          visible={this.state.visible}
        >
        </Modal>
      </div>
    );
  }
}

export default BaseInfo;
