import { useSupportListQuery } from '@/entities/support/model/useSupportListQuery';
import type { SupportProgram } from '@/entities/support/model/supportProgram.type';
import SupportProgramCard from '@/widgets/SupportProgramCard/ui/SupportProgramCard';

export function SupportProgramList() {
  const { data } = useSupportListQuery();
  const items: SupportProgram[] = Array.isArray(data)
    ? (data as unknown as SupportProgram[])
    : data.items;

  if (!items || items.length === 0) {
    return (
      <div className='rounded-xl border p-10 text-center text-slate-500'>
        표시할 지원사업이 없습니다.
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {items.map((p) => (
        <SupportProgramCard key={p.id} program={p} />
      ))}
    </div>
  );
}
