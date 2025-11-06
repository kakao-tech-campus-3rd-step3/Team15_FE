import { useChangePasswordMutation } from '@/entities/user/model/useUserProfile';
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
import { Lock } from 'lucide-react';
import { useEffect } from 'react';
import { isAxiosError } from 'axios';
import { useChangePassword } from '../model/useChangePassword';

const ChangePasswordDialog = () => {
  const {
    isOpen,
    close,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  } = useChangePassword();
  const changePasswordMutation = useChangePasswordMutation();

  useEffect(() => {
    if (changePasswordMutation.isSuccess) {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      close();
      changePasswordMutation.reset();
    }
  }, [
    changePasswordMutation.isSuccess,
    close,
    changePasswordMutation.reset,
    changePasswordMutation,
  ]);

  useEffect(() => {
    if (changePasswordMutation.isError) {
      if (isAxiosError<{ message: string }>(changePasswordMutation.error)) {
        alert(
          changePasswordMutation.error.response?.data?.message || '비밀번호 변경에 실패했습니다.',
        );
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
      changePasswordMutation.reset();
    }
  }, [
    changePasswordMutation.isError,
    changePasswordMutation.error,
    changePasswordMutation.reset,
    changePasswordMutation,
  ]);

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }
    if (newPassword !== confirmPassword) {
      return;
    }
    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <Lock className='mr-2 h-5 w-5 text-green-600' />
            비밀번호 변경
          </DialogTitle>
          <DialogDescription>
            보안을 위해 현재 비밀번호를 입력한 후 새 비밀번호를 설정하세요.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='current-password' className='text-sm font-medium'>
              현재 비밀번호
            </Label>
            <Input
              id='current-password'
              type='password'
              placeholder='현재 비밀번호를 입력하세요'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          {process.env.NODE_ENV === 'development' && (
            <p className='text-sm text-gray-500'>임시: qwer1234!</p>
          )}
          <div>
            <Label htmlFor='new-password' className='text-sm font-medium'>
              새 비밀번호
            </Label>
            <Input
              id='new-password'
              type='password'
              placeholder='새 비밀번호를 입력하세요'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='confirm-password' className='text-sm font-medium'>
              새 비밀번호 확인
            </Label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='새 비밀번호를 다시 입력하세요'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {newPassword && confirmPassword && newPassword !== confirmPassword && (
            <p className='text-sm text-red-600'>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        <DialogFooter className='flex space-x-2'>
          <Button variant='outline' onClick={close}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword ||
              changePasswordMutation.isPending
            }
            className='bg-green-600 hover:bg-green-700'
          >
            {changePasswordMutation.isPending ? '처리 중...' : '변경하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
