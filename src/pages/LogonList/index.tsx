// 注册登记

import React from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const LogonList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect()(LogonList);
