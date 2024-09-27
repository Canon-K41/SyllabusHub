import { useEffect, useRef, useState } from 'react';


export function useResizeObserver() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === ref.current) {
          setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, size };
}
