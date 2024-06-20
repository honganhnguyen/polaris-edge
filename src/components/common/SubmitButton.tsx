import { ReactNode, useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import type { FormInstance, ButtonProps } from 'antd';

type SubmitButtonProps = {
  formInstance: FormInstance;
  children: ReactNode;
} & ButtonProps;

export default function SubmitButton(props: SubmitButtonProps) {
  const { formInstance, disabled, children, ...otherProps } = props;
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], formInstance);

  useEffect(() => {
    formInstance.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      type='primary'
      htmlType='submit'
      {...otherProps}
      disabled={!submittable || disabled}
    >
      {children}
    </Button>
  );
}
