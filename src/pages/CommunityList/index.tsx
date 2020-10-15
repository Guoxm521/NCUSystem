// 社团动态 页面

import React from 'react'
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const CommunityList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>
}

export default connect()(CommunityList)