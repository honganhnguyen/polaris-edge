import { Button, Flex, Form } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Upload } from 'components';

export default function UploadImage({
  imgUrl,
  onChange,
  extraText,
}: {
  imgUrl?: string | null;
  onChange: (values: string) => void;
  extraText?: string;
}) {
  const { t } = useTranslation();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(imgUrl ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFileUrl(imgUrl ?? '');
  }, [imgUrl]);

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
    <Flex gap={15}>
      <Form.Item>
        <Upload
          listType='picture-card'
          showUploadList={false}
          maxCount={1}
          onChange={handleChange}
        >
          {uploadedFileUrl ? (
            <img
              src={uploadedFileUrl}
              alt='avatar'
              style={{ width: '100%' }}
            />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>{t('Upload')}</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        extra={extraText}
      >
        <Upload
          listType='text'
          showUploadList={false}
          maxCount={1}
          onChange={handleChange}
        >
          <Button type='primary' icon={<UploadOutlined />} loading={loading}>
            {t('Upload')}
          </Button>
        </Upload>
      </Form.Item>
    </Flex>
  );
}
