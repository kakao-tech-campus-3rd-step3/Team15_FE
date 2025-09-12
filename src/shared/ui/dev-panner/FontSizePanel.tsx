import { SIZES } from '@/shared/config';
import { copyToClipboard } from '@/shared/lib';
import { useRef, useState } from 'react';

/**
 * Tailwind 글자 크기 클래스를 보여주고,
 * 샘플 요소의 실제 computed font-size/line-height(px)를 복사해줌.
 * (디자인/문서에 붙여넣기 용이)
 */

export function FontSizePanel() {
  const [toast, setToast] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCopy = async (cls: string) => {
    const el = refs.current[cls];
    if (!el) return;
    const styles = window.getComputedStyle(el);
    const size = styles.fontSize; // e.g., "16px"
    const lh = styles.lineHeight; // e.g., "24px"
    const text = `${cls} -> font-size: ${size}; line-height: ${lh};`;
    const ok = await copyToClipboard(text);
    setToast(ok ? `${text} 복사됨` : '복사 실패');
    setTimeout(() => setToast(null), 1000);
  };

  return (
    <section className='rounded-xl border p-3'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>글씨크기 (클릭 시 px 복사)</h3>
        {toast && <span className='text-xs text-green-600'>{toast}</span>}
      </div>
      <div className='mt-2 grid grid-cols-2 gap-2'>
        {SIZES.map((cls) => (
          <button
            key={cls}
            onClick={() => handleCopy(cls)}
            className='rounded-lg border p-2 text-left hover:bg-gray-50'
          >
            <div
              ref={(el) => {
                refs.current[cls] = el;
              }}
              className={`${cls} font-medium leading-normal`}
            >
              {cls.replace('text-', '')} 샘플
            </div>
            <p className='mt-1 text-xs text-gray-500'>클릭 시 실제 px 값이 복사됩니다</p>
          </button>
        ))}
      </div>
    </section>
  );
}
