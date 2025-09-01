import { useState } from 'react';
import { useDevPanel } from '../model/useDevPanel';
import { RoutingPanel } from './RoutingPanel';
import { ColorPanel } from './ColorPanel';
import { FontSizePanel } from './FontSizePanel';

export default function DevPanel() {
  //   if (import.meta.env.MODE !== 'development') return null; // dev에서만

  const { open, setOpen } = useDevPanel();
  const [pos, setPos] = useState({ x: 16, y: 16 });
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);

  return (
    <div
      className='fixed z-[9999] overflow-hidden rounded-2xl border border-gray-200 bg-white text-sm shadow-2xl'
      style={{ left: pos.x, top: pos.y, width: 320 }}
    >
      <div
        className='flex cursor-move items-center justify-between bg-gray-800 px-3 py-2 text-white'
        onMouseDown={(e) => setDrag({ dx: e.clientX - pos.x, dy: e.clientY - pos.y })}
        onMouseMove={(e) => {
          if (!drag) return;
          setPos({ x: e.clientX - drag.dx, y: e.clientY - drag.dy });
        }}
        onMouseUp={() => setDrag(null)}
        onMouseLeave={() => setDrag(null)}
      >
        <span className='font-semibold'>Dev 패널</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className='rounded bg-gray-700 px-2 py-0.5 hover:bg-gray-600'
        >
          {open ? '숨기기' : '보이기'}
        </button>
      </div>

      {open && (
        <div className='grid gap-3 bg-white p-3'>
          <RoutingPanel />
          <ColorPanel />
          <FontSizePanel />
        </div>
      )}
    </div>
  );
}
