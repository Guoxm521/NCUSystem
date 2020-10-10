// 用户管理页面

import { DownloadOutlined, DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';
// import styles from './student.less'

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

const Student: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '证件照',
      dataIndex: 'photo',
      key: 'photo',
      hideInSearch: true,
      width: 100,
      fixed: 'left',
      render: (text, record)=>{
        const img = record.photo
        return (
          <>
            <img src={img} alt="" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
          </>
        )
      }
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      width: 120,
      key: 'studentId',
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: 80,
      key: 'userName',
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      width: 100,
      key: 'sex'
    },
    {
      title: '学院',
      dataIndex: 'college',
      hideInSearch: true,
      key: 'college',
      width: 200,
    },
    {
      title: '专业',
      dataIndex: 'specialty',
      hideInSearch: true,
      key: 'specialty',
      width: 150
    },
    {
      title: '年级',
      dataIndex: 'grade',
      hideInSearch: true,
      key: 'grade',
      width: 150
    },
    {
      title: '班级',
      dataIndex: 'classId',
      hideInSearch: true,
      key: 'classId',
      width: 150
    },
    {
      title: '民族',
      dataIndex: 'nation',
      key: 'nation',
      width: 150,
      valueEnum: {
        0: { text: '汉族'},
        1: { text: '回族'},
        2: { text: '维吾尔族'},
        3: { text: '其他'},
      },
    },
    {
      title: '政治面貌',
      dataIndex: 'political',
      hideInSearch: true,
      key: 'political',
      width: 150
    },
    {
      title: '籍贯',
      dataIndex: 'birthPlace',
      hideInSearch: true,
      key: 'birthPlace',
      width: 150
    },
    {
      title: '身份证号',
      dataIndex: 'IdCard',
      hideInSearch: true,
      key: 'IdCard',
      width: 150
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150
    },
    {
      title: 'QQ号',
      dataIndex: 'qqId',
      hideInSearch: true,
      key: 'qqId',
      width: 150
    },
    {
      title: '头像',
      dataIndex: 'profile',
      hideInSearch: true,
      key: 'profile',
      width: 100,
      render: (text, record)=>{
        const img = record.profile
        return (
          <>
            <img src={img} alt="" style={{width: '30px', height: '30px', borderRadius: '50%'}} />
          </>
        )
      }
    },
    {
      title: '学生状态',
      dataIndex: 'status',
      hideInSearch: true,
      key: 'status',
      width: 100,
      valueEnum: {
        0: { text: '毕业', status: 'Default' },
        1: { text: '休学', status: 'Processing' },
        2: { text: '在校', status: 'Success' },
        3: { text: '退学', status: 'Error' },
      },
    }
  ];

  return (
    <div>
      <ProTable<TableListItem>
        scroll={{x: "1500"}}
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          // <Button type="primary" onClick={() => handleModalVisible(true)} size={'small'}>
          //   <PlusOutlined /> 新增
          // </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)} size={'small'}>
            <UploadOutlined /> 导入
          </Button>,
          <Button type="default" onClick={() => handleModalVisible(true)} size={'small'}>
            <DownloadOutlined /> 导出
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button size={"small"}>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible} />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
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

export default Student;
