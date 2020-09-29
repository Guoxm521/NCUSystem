// 社团大数据页面

import React from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const BigdataList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect()(BigdataList);
