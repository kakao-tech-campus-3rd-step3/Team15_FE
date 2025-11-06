import { useSupportDetailQuery } from '@/entities/support/model/useSupportDetailQuery';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/button';
import { SectionHeader } from '@/shared/ui/section-header';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Building2, ExternalLink, Link as LinkIcon, MapPin, Newspaper } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiError } from '@/shared/errors/ApiError';

export function SupportDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const programId = Number(id);
  if (!id || Number.isNaN(programId) || programId <= 0) {
    throw new ApiError(404, null, '유효하지 않은 지원사업 ID입니다.');
  }
  const { data } = useSupportDetailQuery(programId);

  const openEndPoint = () => {
    if (!data?.endPoint) return;
    window.open(data.endPoint, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className='mx-8 space-y-6 pb-10 pt-10'>
      {/* 상단: 타이틀/목록 버튼 */}
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

      {/* 성공 상태 */}
      <Card>
        <CardHeader>
          <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
            <div>
              <CardTitle className='text-2xl'>{data.name}</CardTitle>
              <CardDescription className='mt-2'>
                <div className='flex flex-wrap items-center gap-2'>
                  <Badge variant='secondary' className='flex items-center gap-1'>
                    <Building2 className='h-3.5 w-3.5' />
                    {data.company}
                  </Badge>
                  <Badge>{data.supportType}</Badge>
                </div>
              </CardDescription>
            </div>

            <div className='flex gap-2'>
              <Button onClick={openEndPoint} disabled={!data.endPoint}>
                <ExternalLink className='mr-2 h-4 w-4' />
                공식 페이지 열기
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-8'>
          {/* 기본 정보 */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='text-muted-foreground text-sm'>기관</div>
              <div className='text-base font-medium'>{data.company || '-'}</div>
            </div>

            <div className='space-y-2'>
              <div className='text-muted-foreground text-sm'>지원 유형</div>
              <div className='text-base font-medium'>{data.supportType || '-'}</div>
            </div>

            <div className='space-y-2'>
              <div className='text-muted-foreground text-sm'>장소</div>
              <div className='flex items-center gap-2 text-base font-medium'>
                <MapPin className='text-muted-foreground h-4 w-4' />
                {data.place || '미정'}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='text-muted-foreground text-sm'>신청 링크</div>
              <div className='flex items-center gap-2'>
                <LinkIcon className='text-muted-foreground h-4 w-4' />
                {data.endPoint ? (
                  <a
                    className='underline underline-offset-4'
                    href={data.endPoint}
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    {data.endPoint}
                  </a>
                ) : (
                  <span className='text-base font-medium'>-</span>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* 상세 내용 */}
          <div className='space-y-3'>
            <div className='text-muted-foreground text-sm'>상세 내용</div>
            <p className='whitespace-pre-line leading-relaxed'>
              {data.content || '등록된 상세 내용이 없습니다.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
