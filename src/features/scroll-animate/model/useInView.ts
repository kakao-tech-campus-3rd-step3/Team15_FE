import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  once: boolean = true,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options, once]);

  return { ref, inView };
}
