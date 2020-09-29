// 新媒体管理

import React from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const MdeiaList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect()(MdeiaList);
