import { useEffect } from 'react';

export default function useWindowResize(setIsOpen: (isOpen: boolean) => void) {
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);
}
