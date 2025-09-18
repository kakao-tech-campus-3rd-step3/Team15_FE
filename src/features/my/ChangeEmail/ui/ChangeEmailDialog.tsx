import { Button } from '@/shared/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { Mail } from 'lucide-react';
import { useChangeEmail } from '../model/useChangeEmail';

const ChangeEmailDialog = () => {
  const { isOpen, newEmail, setNewEmail, close, submit } = useChangeEmail();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <Mail className='mr-2 h-5 w-5 text-blue-600' />
            이메일 주소 변경
          </DialogTitle>
          <DialogDescription>
            새로운 이메일 주소를 입력하세요. 변경 후 새 이메일로 인증 메일이 발송됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='current-email' className='text-sm font-medium'>
              현재 이메일
            </Label>
            <Input
              id='current-email'
              value='user@example.com'
              disabled
              className='bg-gray-50 text-gray-500'
            />
          </div>
          <div>
            <Label htmlFor='new-email' className='text-sm font-medium'>
              새 이메일 주소
            </Label>
            <Input
              id='new-email'
              type='email'
              placeholder='새로운 이메일을 입력하세요'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className='flex space-x-2'>
          <Button variant='outline' onClick={close}>
            취소
          </Button>
          <Button
            onClick={submit}
            disabled={!newEmail || !newEmail.includes('@')}
            className='bg-blue-600 hover:bg-blue-700'
          >
            변경하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
