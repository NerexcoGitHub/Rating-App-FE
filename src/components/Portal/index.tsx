import React from 'react';
import { createPortal } from 'react-dom';

export default function Portal({
  children,
  selector,
}: {
  children: React.ReactNode;
  selector: string;
}) {
  const ref = React.useRef<HTMLElement | null>();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
