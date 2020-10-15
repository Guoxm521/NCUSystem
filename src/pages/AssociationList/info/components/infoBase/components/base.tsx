import { PlusOutlined  } from '@ant-design/icons';
import { Button, Input, Form, message, Modal } from 'antd';
import { connect, FormattedMessage, formatMessage} from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import UploadView from './uploadView'
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

class BaseView extends Component<BaseViewProps, BaseViewState> {
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
            name={"fullname"}
            label={formatMessage({ id: 'setting.basic.fullname' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'setting.basic.fullname-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入学校名称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"syssimplename"}
            label={formatMessage({ id: 'setting.basic.syssimplename' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'setting.basic.syssimplename-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入系统简称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"sysfullname"}
            label={formatMessage({ id: 'setting.basic.sysfullname' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'setting.basic.profile-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入系统全称" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"copyright"}
            label={formatMessage({ id: 'setting.basic.copyright' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'setting.basic.copyright-message' }, {}),
              },
            ]}
          >
            <Input autoComplete={'off'} placeholder="请输入版权信息" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"logo"}
            label={formatMessage({ id: 'setting.basic.logo'})}
          >
            <UploadView id="logoImg" name="logo" title="学校LOGO" onChange={this.testOne.bind(this)} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"favicon"}
            label={formatMessage({ id: 'setting.basic.favicon' })}
          >
            <UploadView id="faviconImg" name="favicon" title="Favicon" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"background"}
            label={formatMessage({ id: 'setting.basic.background' })}
          >
            <UploadView id="backgroundImg" name="background" title="登录页背景" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name={"logonLogo"}
            label={formatMessage({ id: 'setting.basic.logonLogo' })}
          >
            <UploadView id="logonLogoImg" name="logonLogo" title="登录页LOGO" />
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

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(BaseView);
