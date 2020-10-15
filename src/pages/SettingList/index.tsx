import React from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
// import { } from './index.d'

const Setting: React.FC<{}> = (props) => {
  const { children } = props;
  return <PageContainer>{children}</PageContainer>;
};

export default connect((state:any)=>{
  return {
    dve: state.user
  }
})(Setting);
