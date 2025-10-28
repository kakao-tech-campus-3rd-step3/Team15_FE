import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { User } from 'lucide-react';
import { useDeleteAccount } from '../model/useDeleteAccount';

const DeleteAccountDialog = () => {
  const { isOpen, close, deleteConfirmText, setDeleteConfirmText, submit } = useDeleteAccount();
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center text-red-600'>
            <User className='mr-2 h-5 w-5' />
            계정 탈퇴
          </DialogTitle>
          <DialogDescription className='text-gray-700'>
            정말로 계정을 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
            <h4 className='mb-2 font-medium text-red-800'>⚠️ 주의사항</h4>
            <ul className='space-y-1 text-sm text-red-700'>
              <li>• 작성한 모든 글과 댓글이 삭제됩니다</li>
              <li>• 획득한 뱃지와 활동 기록이 사라집니다</li>
              <li>• 동일한 이메일로 재가입이 불가능합니다</li>
              <li>• 탈퇴 후 30일간 데이터 복구가 불가능합니다</li>
            </ul>
          </div>
          <div>
            <Label htmlFor='delete-confirm' className='text-sm font-medium'>
              탈퇴를 확인하려면 <span className='font-bold text-red-600'>"계정 탈퇴"</span>를
              입력하세요
            </Label>
            <Input
              id='delete-confirm'
              placeholder='계정 탈퇴'
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className='mt-2'
            />
          </div>
        </div>
        <DialogFooter className='flex space-x-2'>
          <Button variant='outline' onClick={close}>
            취소
          </Button>
          <Button
            onClick={submit}
            disabled={deleteConfirmText !== '계정 탈퇴'}
            className='bg-red-600 text-white hover:bg-red-700'
          >
            계정 탈퇴하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
