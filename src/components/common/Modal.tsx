import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';

type ModalProps = {
  children?: React.ReactNode;
} & AntModalProps;
export default function Modal(props: ModalProps) {
  const { children, ...otherProps } = props;

  return (
    <AntModal maskClosable={false} {...otherProps}>
      {children}
    </AntModal>
  );
}
