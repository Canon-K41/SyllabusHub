import { useEffect, useRef, useState } from 'react';

export function useResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === currentRef) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentRef);

    return () => {
      resizeObserver.unobserve(currentRef);
    };
  }, []);

  return { ref, size };
}
