import { useEffect, useState } from 'react';
import axios from 'axios';
import type { BadgeType } from '../types/badge';

export const BadgeImage = ({ badge }: { badge: BadgeType }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (!badge.iconUrl) return;

    const controller = new AbortController();
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      try {
        const res = await axios.get(badge.iconUrl, {
          responseType: 'blob',
          signal: controller.signal,
        });
        objectUrl = URL.createObjectURL(res.data);
        setImageSrc(objectUrl);
      } catch (err) {
        if (!axios.isCancel(err)) console.error(err);
      }
    };

    fetchImage();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null; // 명시적으로 정리
      }
    };
  }, [badge.iconUrl]);

  return imageSrc ? (
    <img src={imageSrc} alt={badge.name} className='h-full w-full object-cover' />
  ) : null;
};
