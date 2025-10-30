import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import type { ReportReasonType, ReportRequest } from '@/features/submit-report/model/report.type';
import { useGetReportReasonType } from '../model/useGetReportReasonType';

type ReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportType: 'POST' | 'COMMENT';
  targetId: number;
  onSubmit: (payload: ReportRequest) => void;
  defaultReasonType?: ReportReasonType;
  defaultContent?: string;
  title?: string;
  description?: string;
  maxLength?: number; // default 300
};

export function ReportModal({
  open,
  onOpenChange,
  reportType,
  targetId,
  onSubmit,
  defaultReasonType = 'OTHER',
  defaultContent = '',
  title = '신고하기',
  description = '신고 사유를 선택하고 필요한 경우 상세 내용을 입력해주세요.',
  maxLength = 300,
}: ReportModalProps) {
  const [reasonType, setReasonType] = useState<ReportReasonType>(defaultReasonType);
  const [content, setContent] = useState<string>(defaultContent);
  const { data } = useGetReportReasonType();
  const isOther = reasonType === 'OTHER';
  const trimmed = content.trim();
  const remaining = useMemo(
    () => Math.max(0, maxLength - content.length),
    [content.length, maxLength],
  );

  const isValid = useMemo(() => {
    if (isOther) return trimmed.length > 0 && trimmed.length <= maxLength; // 기타는 필수
    return trimmed.length <= maxLength; // 기타가 아니어도 입력 가능(선택 사항)
  }, [isOther, trimmed.length, maxLength]);

  const handleClose = () => onOpenChange(false);

  const handleSubmit = () => {
    if (!isValid) return;
    const payload = {
      reportType,
      targetId,
      reasonType,
      ...(trimmed.length > 0 ? { content: trimmed } : {}), // 기타가 아니어도 내용이 있으면 포함
    };
    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[440px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        {/* Report target summary (read-only) */}
        <div className='mt-2 grid gap-3'>
          <div className='grid gap-1.5'>
            <Label htmlFor='report-target'>대상</Label>
            <div id='report-target' className='text-muted-foreground text-sm'>
              {reportType} • ID: {targetId}
            </div>
          </div>

          {/* Reason select */}
          <div className='grid gap-1.5'>
            <Label htmlFor='reasonType'>신고 사유</Label>
            <Select value={reasonType} onValueChange={(v) => setReasonType(v as ReportReasonType)}>
              <SelectTrigger id='reasonType' className='w-full'>
                <SelectValue placeholder='사유를 선택하세요' />
              </SelectTrigger>
              <SelectContent>
                {data.map((r) => (
                  <SelectItem key={r.reportReasonType} value={r.reportReasonType}>
                    {r.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Free text content (always visible; required only when OTHER) */}
          <div className='grid gap-1.5'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='report-content'>상세 내용</Label>
              <span
                className={`text-xs ${remaining < 0 ? 'text-red-600' : 'text-muted-foreground'}`}
              >
                {content.length}/{maxLength}
              </span>
            </div>
            <Textarea
              id='report-content'
              placeholder={
                isOther
                  ? '예) 선정적인 표현이 포함되어 있습니다.'
                  : '선택 사항: 추가로 전달하고 싶은 내용이 있다면 적어주세요.'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={maxLength}
            />
            <p className='text-muted-foreground text-xs'>
              사유가 &ldquo;기타&rdquo;일 때는 <span className='font-medium'>상세 내용이 필수</span>
              입니다. 그 외 사유는 <span className='font-medium'>선택 사항</span>이에요.
            </p>
          </div>
        </div>

        <DialogFooter className='mt-4'>
          <Button type='button' variant='outline' onClick={handleClose}>
            취소
          </Button>
          <Button type='button' onClick={handleSubmit} disabled={!isValid}>
            신고
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
