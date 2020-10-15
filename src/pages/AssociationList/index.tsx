// 社团管理页面

import React from 'react';
import { connect } from 'umi';
// import { PageContainer } from '@ant-design/pro-layout';

const AssociationList: React.FC<{}> = (props) => {
  const { children } = props;
  return <>{children}</>;
};

export default connect()(AssociationList);
