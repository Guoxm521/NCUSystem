// 经费管理页面

import React from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const OutlayList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect()(OutlayList);
