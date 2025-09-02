import { ROUTE_LIST } from '@/shared/config';
import { useNavigate } from 'react-router-dom';

export function RoutingPanel() {
  const navigate = useNavigate();
  return (
    <section className='rounded-xl border p-3'>
      <h3 className='mb-2 font-semibold'>라우팅</h3>
      <div className='flex flex-wrap gap-2'>
        {ROUTE_LIST.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className='rounded-lg border px-2.5 py-1 transition hover:bg-gray-50 active:scale-[0.98]'
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
