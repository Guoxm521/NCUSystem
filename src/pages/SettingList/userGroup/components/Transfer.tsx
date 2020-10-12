// 树形穿梭框

import React, { useState } from 'react'
import { Transfer, Tree } from 'antd';

const isChecked = (selectedKeys: any, eventKey: any) => selectedKeys.indexOf(eventKey) !== -1;

const generateTree = (treeNodes: any = [], checkedKeys: any = []) =>
  treeNodes.map(({ children, ...props }: any) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: any) => {
  const transferDataSource: any = [];
  function flatten(list: any = []) {
    list.forEach((item: any) => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
      titles={['选择应用权限','权限名称']}
    >
      {({ direction, onItemSelect, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }: any) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
              onSelect={(_, { node: { key } }: any) => {
                onItemSelect(key, !isChecked(checkedKeys, key));
              }}
            />
          );
        }
      }}
    </Transfer>
  );
};

export default TreeTransfer