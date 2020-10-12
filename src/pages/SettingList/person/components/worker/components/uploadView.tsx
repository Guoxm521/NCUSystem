// 封装的上传组件

import React, { FC, useState } from 'react'

import { Upload, Modal, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';

interface UploadViewProps {
  name: string
  title: string
  onChange?: (file: any) => void
  onPreview?: () => void
}

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

  const intl = useIntl()

  const upLoadButton = (
    <div>
      <PlusOutlined />
      <div>{intl.formatMessage({ id: 'setting.basic.Upload'})}</div>
    </div>
  )

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
    setVisible(true)
  }

  // 关闭 modal
  const handleCancel = () => setVisible(false);



  return (
    <>
      <Upload
        // action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
        name={name}
        listType={"picture-card"}
        accept={"image/jpg, image/jpeg, image/png"}
        // showUploadList={false}
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length >= 1 ? null : upLoadButton}
      </Upload>
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onCancel={handleCancel}
      >
        {/* <img src={imgUrl} style={{width: '100%'}} /> */}
        <Image src={imgUrl} preview={true} />
      </Modal>
    </>
  )
}

export default UploadView