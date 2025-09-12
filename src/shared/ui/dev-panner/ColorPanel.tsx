import { COLOR_TOKENS } from '@/shared/config';
import { copyToClipboard } from '@/shared/lib';
import { useState } from 'react';

export function ColorPanel() {
  const [toast, setToast] = useState<string | null>(null);

  const handleCopy = async (val: string) => {
    const ok = await copyToClipboard(val);
    setToast(ok ? `${val} 복사됨` : '복사 실패');
    setTimeout(() => setToast(null), 1000);
  };

  return (
    <section className='rounded-xl border p-3'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>색상 (클릭 시 복사)</h3>
        {toast && <span className='text-xs text-green-600'>{toast}</span>}
      </div>
      <div className='mt-2 grid grid-cols-2 gap-2'>
        {COLOR_TOKENS.map((c) => (
          <button
            key={c.name}
            onClick={() => handleCopy(c.value)}
            className='group flex items-center gap-2 rounded-lg border p-2 hover:bg-gray-50'
            title={`${c.name}: ${c.value}`}
          >
            <span
              className='inline-block h-5 w-5 rounded ring-1 ring-black/10'
              style={{ background: c.value }}
            />
            <div className='flex flex-col items-start'>
              <span className='text-xs text-gray-500'>{c.name}</span>
              <span className='font-mono text-sm'>{c.value}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
