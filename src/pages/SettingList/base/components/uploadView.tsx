// 封装的上传组件

import React, { FC, useState } from 'react'

import { Upload, Image, Space } from 'antd';
import { PlusOutlined,EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
import styles from './uploadView.less'

interface UploadViewProps {
  id: string
  name: string
  title: string
  onChange?: (file: any) => void
  onPreview?: () => void
}

interface ShowImageProps {
  name: string
  src: string
  onDelete: () => void
}

// 预览组件
const ShowImage = function (props: ShowImageProps) {
  const { name }= props
  const preview = function () {
    document.getElementById(name)?.click()
  }

  const deleteImage = function () {
    props.onDelete()
  }

  return (
    <div className={styles['upload-view-box']}>
      <div className={styles['upload-view-box-box']}>
        <Space size={15} className={styles['upload-view-icon-box']}>
          <a title={"预览图片"} onClick={preview} >
            <EyeOutlined size={12} />
          </a>
          <a title={"删除图片"} >
            <DeleteOutlined size={12} onClick={deleteImage} />
          </a>
        </Space>
        <Image
          className={styles['upload-view-image-box']}
          src={props.src}
          id={name}
        />
      </div>
    </div>
  )
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


// 上传图片组件
const UploadView: FC<UploadViewProps> = (props: UploadViewProps) => {

  const intl = useIntl()

  const upLoadButton = (
    <div>
      <PlusOutlined />
      <div>{intl.formatMessage({ id: 'setting.basic.Upload'})}</div>
    </div>
  )

  const {name, onChange} = props
  const [ imgUrl, setImgUrl ] = useState('')
  const [ showImg, setShowImg ] = useState(false)


  // upload 的 onChange 事件
  const handleChange = async ({ file, fileList }:any) => {

    const url:any = await getBase64(file.originFileObj)
    setImgUrl(url)
    setShowImg(true)
    if (onChange) {
      onChange(file)
    }
  }

  const deleteImage = () => {
    setShowImg(false)
  }

  return (
    <>
      <div style={{display: showImg ? 'none' : 'block'}}>
        <Upload
          name={name}
          listType={"picture-card"}
          accept={"image/jpg, image/jpeg, image/png"}
          showUploadList={false}
          onChange={handleChange}
        >
          {upLoadButton}
        </Upload>
      </div>
      <div style={{display: showImg ? 'block' : 'none'}}>
        <ShowImage src={imgUrl} name={props.id} onDelete={deleteImage} />
      </div>
    </>
  )
}

export default UploadView