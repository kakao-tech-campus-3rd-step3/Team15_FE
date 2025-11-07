import { useEffect, useState } from 'react';
import axios from 'axios';
import type { BadgeType } from '../types/badge';

export const BadgeImage = ({ badge }: { badge: BadgeType }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`${badge.iconUrl}`, {
          responseType: 'blob', // 이미지 바이너리로 받음
        });
        const url = URL.createObjectURL(res.data);
        setImageSrc(url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImage();
  }, [badge.iconUrl]);

  return <img src={imageSrc} alt={badge.name} className='h-full w-full object-cover' />;
};
