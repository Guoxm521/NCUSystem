import React, { Component } from 'react';

import { FormattedMessage, Dispatch, connect } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BindingView from './components/binding';
import { CurrentUser } from './data';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './base.less';

// 菜单组件
import BaseInfo from './components/baseInfo/index'
import ChangeOffice from './components/changeOffice/index'
import NewMedia from './components/newMedia'
import Organization from './components/organization/index'
import Position from './components/position/index'

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = 'baseInfo' | 'organization' | 'position' | 'newmedia' | 'changeoffice';
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}

class InfoBase extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      baseInfo: (
        <FormattedMessage id="info.menuMap.baseInfo" defaultMessage="BaseInfo Info" />
      ),
      organization: (
        <FormattedMessage id="info.menuMap.organization" defaultMessage="Organization Info" />
      ),
      position: (
        <FormattedMessage id="info.menuMap.position" defaultMessage="Position Info" />
      ),
      newmedia: (
        <FormattedMessage id="info.menuMap.newMedia" defaultMessage="NewMedia Info" />
      ),
      changeoffice: (
        <FormattedMessage id="info.menuMap.changeOffice" defaultMessage="ChangeOffice Info" />
      ),
    };
    this.state = {
      mode: 'inline',
      menuMap,
      selectKey: 'baseInfo',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'accountAndsettings/fetchCurrent',
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case 'baseInfo':
        return <BaseInfo />;
      case 'organization':
        return <Organization />;
      case 'position':
        return <Position />;
      case 'newmedia':
        return <NewMedia />;
      case 'changeoffice':
        return <ChangeOffice />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountAndsettings.currentUser,
  }),
)(InfoBase);
