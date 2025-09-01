import { useEffect, useState } from 'react';

const LS_KEY = 'showDevPanel';

export function useDevPanel() {
  const [open, setOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : true; // 기본 on
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(open));
  }, [open]);

  return { open, setOpen };
}
