import React, { useState } from 'react';
import { Modal } from 'antd';

import { TableListItem } from '../data';
import SearchTransfer from './SearchTransfer'

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}


export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const treeData = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' },
    ],
  },
  { key: '0-2', title: '0-3' },
];


const ChangePerson: React.FC<UpdateFormProps> = (props) => {

  const [targetKeys, setTargetKeys] = useState([]);

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;

  const onChange = (keys: any) => {
    setTargetKeys(keys);
  };

  return (
    <Modal
      width={1000}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="权限配置"
      visible={updateModalVisible}
      // footer={}
      onCancel={() => handleUpdateModalVisible()}
    >
      {<SearchTransfer />}
    </Modal>
  );
};

export default ChangePerson;
