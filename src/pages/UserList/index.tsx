import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';

const UserList: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect()(UserList);
