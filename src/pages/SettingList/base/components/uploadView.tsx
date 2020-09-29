// 封装的上传组件

import React, { FC, useState } from 'react'

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

const intl = useIntl()

interface UploadViewProps {
  name: string
  title: string
  onChange?: (file: any) => void
  onPreview?: () => void
}


const upLoadButton = (
  <div>
    <PlusOutlined />
    <div>{intl.formatMessage({ id: 'setting.basic.Upload'})}</div>
  </div>
)

// 得到 base64
const getBase64 = (img: any) => {
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onload = () => res(reader.result)
    reader.onerror = error => rej(error)
  })
}


const UploadView: FC<UploadViewProps> = (props: UploadViewProps) => {

  const {name, title, onChange, onPreview} = props

  const [ visible, setVisible ] = useState(false)
  const [ fileList, setFileList ] = useState([])
  const [ imgUrl, setImgUrl ] = useState('')


  // upload 的 onChange 事件
  const handleChange = ({ file, fileList }:any) => {
    setFileList(fileList)
    // onChange(file)
  }

  // upload 的 onPreview 事件
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setImgUrl(file.rul || file.preview)
  }

  // 关闭 modal
  const handleCancel = () => setVisible(false);



  return (
    <>
      <Upload
        name={name}
        listType={"picture-card"}
        accept={"image/jpg, image/jpeg, image/png"}
        showUploadList={false}
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length > 1 ? null : upLoadButton}
      </Upload>
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleCancel}
      >
        <img src={imgUrl} style={{width: '100%'}} />
      </Modal>
    </>
  )
}

export default UploadView