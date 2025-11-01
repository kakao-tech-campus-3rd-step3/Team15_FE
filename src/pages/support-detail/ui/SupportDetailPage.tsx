import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { SectionHeader } from '@/shared/ui/section-header';
import { Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SupportDetailPage() {
  const navigate = useNavigate();
  return (
    <section className='mx-8 space-y-6 pb-10 pt-10'>
      {/* 상단: 검색/타이틀/글쓰기 */}
      <SectionHeader
        title={
          <>
            <Newspaper className='mr-2 h-6 w-6 text-green-600' />
            지원사업 상세정보
          </>
        }
        description='선택한 지원사업의 상세정보를 확인하세요'
        left={
          <Button size='lg' onClick={() => navigate(ROUTES.support)}>
            목록으로
          </Button>
        }
      />
    </section>
  );
}
