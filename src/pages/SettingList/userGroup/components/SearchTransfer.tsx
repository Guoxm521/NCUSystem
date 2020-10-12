// 带有搜索框的穿梭框

import React, { useState, useEffect } from "react"
import { Transfer, Switch } from 'antd';

const SearchTransfer:React.FC<{}> = (props) => {
  const [ oneWay, setOneWay ] = useState(false);
  const [ mockData, setMockData ] = useState([{key: '', title: '', description: '', chosen: false}]);
  const [ targetKeys, setTargetKeys ] = useState(['']);

  useEffect(() => {
    const newTargetKeys = [];
    const newMockData = [];
    for (let i = 0; i < 2000; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        newTargetKeys.push(data.key);
      }
      newMockData.push(data);
    }

    setTargetKeys(newTargetKeys);
    setMockData(newMockData);
  }, []);

  const onChange = (newTargetKeys: any, direction: any, moveKeys: any) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  return (
    <>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        // render={item => item.title}
        oneWay={oneWay}
        pagination
      />
      {/* <br />
      <Switch
        unCheckedChildren="one way"
        checkedChildren="one way"
        checked={oneWay}
        onChange={setOneWay}
      /> */}
    </>
  );
};

export default SearchTransfer