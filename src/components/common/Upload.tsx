import { UploadProps, message, Upload as AntUpload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { getAccessToken } from 'services/token.service';
import { t } from 'i18next';

export default function Upload({
  children,
  ...otherProps
}: { children: React.ReactNode } & UploadProps) {
  const accessToken = getAccessToken();
  return (
    <AntUpload
      action={`${process.env.REACT_APP_BASE_CORE_API}/upload-file`}
      headers={{
        Authorization: 'Bearer ' + accessToken,
        'Access-Control-Allow-Origin': '*',
      }}
      method='POST'
      beforeUpload={(file: RcFile) => {
        const isJpgOrPng =
          file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error(t('You can only upload JPG/PNG file!'));
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error(t('Image must smaller than 1MB!'));
        }
        return isJpgOrPng && isLt2M;
      }}
      {...otherProps}
    >
      {children}
    </AntUpload>
  );
}
