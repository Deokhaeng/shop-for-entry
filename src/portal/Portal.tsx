import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalPropsType {
  children?: (string | JSX.Element)[] | string | JSX.Element
}

function Portal({ children }: PortalPropsType) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
      children,
      document.querySelector('#portal'),
    )
    : null;
}

export default Portal;
