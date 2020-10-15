// 用户管理页面

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import ChangeAuthorization, { FormValueType } from './components/ChangeAuthorization';
import ChangePerson from './components/ChangePerson'
import { TableListItem } from './data';
import { queryRule, updateRule, addRule, removeRule } from './service';
import styles from './usergroup.less'

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const UserGroup: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [changePersonVisible, handleChangePersonVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户组名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
    },
    {
      title: '权限详情',
      dataIndex: 'infomation',
      key: 'infomation',
      hideInSearch: true,
      width: 350,
      // 使用 antd Tree 组件
      render: (text, record) => (
        <>
        
        </>
      )
    },
    {
      title: '用户组人数',
      dataIndex: 'userGroup',
      key: 'userGroup',
      hideInSearch: true,
      width: 250,
      render: (text, record) => (
        <>
        
        </>
      )
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      hideInSearch: true,
      width: 450
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 250,
      fixed: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true)
              setStepFormValues(record)
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleChangePersonVisible(true);
              setStepFormValues(record);
            }}
          >
            人员配置
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            权限配置
          </a>
          <Divider type="vertical" />
          <a
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <div>
      <ProTable<TableListItem>
        scroll={{x: "1500"}}
        headerTitle="权限列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'small'}>
            <PlusOutlined /> 新增
          </Button>
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
      />
      
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
      <ChangePerson 
        onCancel={() => handleChangePersonVisible(false)}
        updateModalVisible={changePersonVisible}
        values={stepFormValues}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <ChangeAuthorization
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </div>
  );
};

export default UserGroup;