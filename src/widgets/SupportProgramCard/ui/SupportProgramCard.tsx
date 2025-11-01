import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import type { SupportProgram } from '@/entities/support/model/supportProgram.type';
import { useNavigate } from 'react-router-dom';

type Props = {
  program: SupportProgram;
};

const CATEGORY_LABEL: Record<string, string> = {
  CAREER: '진로취업',
  RELATIONSHIP: '대인관계',
  SOCIAL: '사회생활',
  MENTAL: '정신건강',
  FAMILY: '가족',
  SEX: '성',
  TEMP: '기타',
};

function isClosed(endPoint: string) {
  // endPoint: 'YYYY-MM-DD'
  const end = new Date(endPoint + 'T23:59:59');
  const now = new Date();
  return end.getTime() < now.getTime();
}

function formatDate(date: string) {
  // Expecting YYYY-MM-DD -> YYYY.MM.DD
  return date.replaceAll('-', '.');
}

export function SupportProgramCard({ program }: Props) {
  const closed = isClosed(program.endPoint);
  const category = CATEGORY_LABEL[program.supportType] ?? program.supportType;
  const naviget = useNavigate();

  return (
    <Card className='rounded-2xl border border-slate-200/80 shadow-sm transition-shadow hover:shadow-md'>
      <CardHeader className='space-y-2'>
        <Badge variant='secondary' className='w-fit rounded-full bg-amber-100 text-amber-800'>
          {category}
        </Badge>
        <CardTitle className='text-lg font-semibold leading-snug md:text-xl'>
          {program.name}
        </CardTitle>
        <p className='text-sm font-semibold text-emerald-700'>{program.company}</p>
      </CardHeader>

      <CardContent className='space-y-2 text-sm text-slate-600'>
        {/* 목록 조회 응답에는 content가 없으므로 간단 안내만 표기 */}
        <div className='flex flex-wrap gap-4 text-xs md:text-sm'>
          <span>종료: {formatDate(program.endPoint)}</span>
        </div>
      </CardContent>

      <CardFooter>
        {closed ? (
          <Button disabled className='w-full bg-slate-100 text-slate-500'>
            종료됨
          </Button>
        ) : (
          <Button className='w-full' onClick={() => naviget(`/support/${program.id}`)}>
            더 자세히 알아보기
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default SupportProgramCard;
