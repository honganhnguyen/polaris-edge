import { useState, useEffect } from 'react';
import { Spin } from 'antd';

function Spinner() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin size='large' />
    </div>
  ) : null;
}

export default Spinner;
