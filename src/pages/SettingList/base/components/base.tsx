import { PlusOutlined  } from '@ant-design/icons';
import { Button, Input, Upload, Form, message, Row, Col, Modal } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import UploadView from './uploadView'
import styles from './BaseView.less';

interface BaseViewProps {
  currentUser?: CurrentUser;
}

interface BaseViewState {
  visible: boolean
  fileList: any
  [name: string]: any
}

class BaseView extends Component<BaseViewProps, BaseViewState> {
  view: HTMLDivElement | undefined = undefined;

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]
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

  // 上传 logo 的方法
  logoImg = ({ file, fileList }: any) => {
    console.log(fileList)
    this.getBase64(file.originFileObj, (logoImgUrl: any) => {
      this.setState({logoImgUrl})
    })
  }

  // 上传 favicon 的方法
  faviconImg = ({ file }: any) => {
    this.getBase64(file.originFileObj, (faviconImgUrl: any) => {
      this.setState({faviconImgUrl})
    })
  }

  // 上传 background 的方法
  backgroundImg = ({ file }: any) => {
    this.getBase64(file.originFileObj, (backgroundImgUrl: any) => {
      this.setState({backgroundImgUrl})
    })
  }

  // 上传 logonLogo 的方法
  logonLogoImg = ({ file }: any) => {
    this.getBase64(file.originFileObj, (logonLogoImgUrl: any) => {

      this.setState({logonLogoImgUrl})
    })
  }

  test = (e: any) => {
    console.log(e)
  }

  // 预览
  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      await this.getBase64(file.originFileObj, (logonLogoImgUrl: any) => {
        this.setState({logonLogoImgUrl})
      })
    }
  }

  // 得到图片的Base64
  getBase64(img: any, callback:any) {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => callback(reader.result));
  }

  render() {
    const { currentUser } = this.props;

    const upLoadButton = (
      <div>
        <PlusOutlined />
        <div>{formatMessage({ id: 'setting.basic.Upload'})}</div>
      </div>
    )

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <Row>
          <Col span={10} offset={7}>
            <Form
              layout={"horizontal"}
              labelCol={{span: 10}}
              onFinish={this.handleFinish}
              initialValues={currentUser}
              hideRequiredMark
            >
              <Form.Item
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
                name={"logo"}
                label={formatMessage({ id: 'setting.basic.logo'})}
              >
                {/* <Upload
                  fileList={this.state.fileList}
                  name={"logo"}
                  listType={"picture-card"}
                  accept={"image/jpg, image/jpeg, image/png"}
                  showUploadList={false}
                  onPreview={this.handlePreview}
                  onChange={this.logoImg}
                  >
                  {this.state.logoImgUrl ? <img src={this.state.logoImgUrl} style={{width: '100%'}} />  : upLoadButton}
                </Upload> */}
                <UploadView name="测试" title="测试" />
              </Form.Item>
              <Form.Item
                name={"favicon"}
                label={formatMessage({ id: 'setting.basic.favicon' })}
              >
                <Upload
                  name={"favicon"}
                  listType={"picture-card"}
                  accept={"image/jpg, image/jpeg, image/png"}
                  showUploadList={false}
                  onChange={this.faviconImg}
                >
                  {this.state.faviconImgUrl ? <img src={this.state.faviconImgUrl} style={{width: '100%'}} />  : upLoadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"background"}
                label={formatMessage({ id: 'setting.basic.background' })}
              >
                <Upload
                  name={"background"}
                  listType={"picture-card"}
                  accept={"image/jpg, image/jpeg, image/png"}
                  showUploadList={false}
                  onChange={this.backgroundImg}
                >
                  {this.state.backgroundImgUrl ? <img src={this.state.backgroundImgUrl} style={{width: '100%'}} />  : upLoadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                name={"logonLogo"}
                label={formatMessage({ id: 'setting.basic.logonLogo' })}
              >
                <Upload
                  name={"avatar"}
                  listType={"picture-card"}
                  className={"avatar-uploader"}
                  accept={"image/jpg, image/jpeg, image/png"}
                  showUploadList={false}
                  onChange={this.logonLogoImg}
                >
                  {this.state.logonLogoImgUrl ? <img src={this.state.logonLogoImgUrl} style={{width: '100%'}} />  : upLoadButton}
                </Upload>
              </Form.Item>
              <Form.Item>
                <div className={styles['form-item-button-box']}>
                  <Button htmlType="submit" type="primary">
                    <FormattedMessage
                      id="setting.basic.update"
                      defaultMessage="Update Information"
                    />
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
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
