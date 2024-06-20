import { Button, ModalProps, Upload, message } from 'antd';
import { Modal } from 'components';
import { useTranslation } from 'react-i18next';
import { InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { attachmentService } from 'services';
const { Dragger } = Upload;

type UploadPhotoModalProps = {
  isModalOpen: boolean;
  isLoading?: boolean;
  setIsLoading: (value: boolean) => void;
  onSubmit: (value: any) => void;
  setIsModalOpen: (value: boolean) => void;
  loading?: boolean;
} & ModalProps;

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function UploadPhotoModal(props: UploadPhotoModalProps) {
  const { isModalOpen, setIsModalOpen, onSubmit, isLoading, setIsLoading } = props;
  const { t } = useTranslation();
  const [image, setImage] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImage(null);
    setPreviewImage(null);
  }, [isModalOpen]);

  const handleOk = async () => {
    if (!image) {
      setIsError(true);
      return;
    }
    try {
      setIsLoading(true);
      const response = await attachmentService.uploadFile(image);
      onSubmit(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onBeforeUpload = async (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(t('You can only upload JPG/PNG file!'));
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t('Image must smaller than 1MB!'));
      return false;
    }
    const filePreview = await getBase64(file);
    setImage(file);
    setPreviewImage(filePreview);
    return false;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={`${t('Upload a photo')}`}
      open={isModalOpen}
      onCancel={handleCancel}
      width={723}
      classNames={{ body: 'upload-photo-modal' }}
      footer={[
        <Button onClick={handleCancel} key='back'>
          {t('Cancel')}
        </Button>,
        <Button
          onClick={handleOk}
          disabled={!image}
          loading={isLoading}
          key='submit'
          type='primary'
        >
          {t('Upload')}
        </Button>,
      ]}
    >
      <Dragger
        name='file'
        multiple={false}
        accept='image/*'
        showUploadList={false}
        className={isError ? 'error' : ''}
        beforeUpload={onBeforeUpload}
      >
        {previewImage ? (
          <div className='preview-container'>
            <img src={previewImage} alt='' />
          </div>
        ) : (
          <>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              {t('Click or drag file to this area to upload')}
            </p>
            <p className='ant-upload-hint'>
              {t('Support for a single or bulk upload.')}
            </p>
          </>
        )}
      </Dragger>
    </Modal>
  );
}
