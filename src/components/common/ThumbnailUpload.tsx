import { Button } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Upload } from 'components'
import picture from 'assets/images/pictures/_Image with Fixed Ratio_.png';

export default function ThumbnailUpload({
  record,
  onChange,
  disabled,
}: {
  record: any;
  onChange?: (values: string) => void;
  disabled: boolean
}) {
  const { t } = useTranslation();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(record?.picture ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (record?.picture) {
      setUploadedFileUrl(record?.picture);
    } else {
      setUploadedFileUrl(picture);
    }
  }, [record?.picture]);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response.imageURL;
      setLoading(false);
      setUploadedFileUrl(url);
      onChange && onChange(url);
    }
  };

  return (
    <Upload
      name='logo'
      listType='picture'
      className='project-upload'
      showUploadList={false}
      onChange={handleChange}
      maxCount={1}
      disabled={disabled}>
      <div>
        {loading ? (
          <LoadingOutlined
            className='project-upload-icon'
            style={{ color: record.iconColor }}
          />
        ) : (
          <img
            src={uploadedFileUrl}
            alt={record.name}
            className='project-upload-icon project-picture hover-picture-edit'
            style={{ color: record.iconColor }}
          />
        )}
        <Button type='link' className='project-upload-btn'>
          {' '}
          {t('Edit')}{' '}
        </Button>
      </div>
    </Upload>
  );
}
