import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Use 'smooth' if you want a gliding effect, 'instant' for immediate snap
    });
  }, [pathname]);

  return null;
}