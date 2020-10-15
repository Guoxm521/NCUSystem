import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../styles.less';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
interface TableFormProps {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
  const [clickedCancel, setClickedCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setData(newData);
    }
  };
  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);
    setTimeout(() => {
      if (clickedCancel) {
        setClickedCancel(false);
        return;
      }
      const target = getRowByKey(key) || ({} as any);
      if (!target.platformName || !target.typeOf || !target.QRCode || !target.URLPath) {
        message.error('请填写完整信息。');
        (e.target as HTMLInputElement).focus();
        setLoading(false);
        return;
      }
      delete target.isNew;
      toggleEditable(e, key);
      if (onChange) {
        onChange(data as TableFormDateType[]);
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...(data as TableFormDateType[])];
    // 编辑前的原始数据
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: '平台名称',
      dataIndex: 'platformName',
      key: 'platformName',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'platformName', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="平台名称"
            />
          );
        }
        return text;
      },
    },
    {
      title: '类别',
      dataIndex: 'typeOf',
      key: 'typeOf',
      width: '15%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'typeOf', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="部门人数"
            />
          );
        }
        return text;
      },
    },
    {
      title: '二维码',
      dataIndex: 'QRCode',
      key: 'QRCode',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={(e) => handleFieldChange(e, 'QRCode', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="二维码"
            />
          );
        }
        return text;
      },
    },
    {
      title: '访问地址',
      dataIndex: 'URLPath',
      key: 'URLPath',
      width: '35%',
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <Input
              value={text}
              onChange={(e) => handleFieldChange(e, 'URLPath', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
              placeholder="访问地址"
            />
          );
        }
        return text;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: TableFormDateType) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={(e) => saveRow(e, record.key)}>添加</a>
                <Divider type="vertical" />
                <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
                  <a>删除</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={(e) => saveRow(e, record.key)}>保存</a>
              <Divider type="vertical" />
              <a onClick={(e) => cancel(e, record.key)}>取消</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={(e) => toggleEditable(e, record.key)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDateType>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newMember}
      >
        <PlusOutlined />
        新增部门
      </Button>
    </>
  );
};

export default TableForm;