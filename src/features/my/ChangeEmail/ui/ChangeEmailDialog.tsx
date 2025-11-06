import { useState } from 'react';
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
import { Mail } from 'lucide-react';
import { useChangeEmail } from '../model/useChangeEmail';
import { useUpdateEmail } from '@/entities/user/model/useUserProfile';
import { useEmailVerification } from '@/features/auth/lib/useEmailVerification';
import { emailSchema } from '@/features/auth/lib/auth.schema';

interface Props {
  email: string;
}

const ChangeEmailDialog = ({ email }: Props) => {
  const { isOpen, newEmail, setNewEmail, close } = useChangeEmail();
  const updateEmail = useUpdateEmail();
  const { state, sendVerificationCode, verifyCode, reset } = useEmailVerification();
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = () => {
    const result = emailSchema.safeParse(newEmail);
    if (!result.success) {
      alert(result.error.issues[0]?.message);
      return;
    }
    sendVerificationCode(newEmail);
  };

  const handleVerify = () => {
    verifyCode(newEmail, verificationCode);
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail.mutateAsync({ email: newEmail, code: verificationCode });
      alert('이메일이 성공적으로 변경되었습니다.');
      reset();
      close();
    } catch (error) {
      alert('이메일 변경 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const handleClose = () => {
    close();
    reset();
    setVerificationCode('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <Mail className='mr-2 h-5 w-5 text-blue-600' />
            이메일 주소 변경
          </DialogTitle>
          <DialogDescription>
            새로운 이메일 주소를 입력하고 인증을 완료한 뒤 이메일을 변경하세요.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* 현재 이메일 */}
          <div>
            <Label htmlFor='current-email' className='text-sm font-medium'>
              현재 이메일
            </Label>
            <Input id='current-email' value={email} disabled className='bg-gray-50 text-gray-500' />
          </div>

          {/* 새 이메일 입력 */}
          <div>
            <Label htmlFor='new-email' className='text-sm font-medium'>
              새 이메일 주소
            </Label>
            <div className='flex space-x-2'>
              <Input
                id='new-email'
                type='email'
                placeholder='새로운 이메일을 입력하세요'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={state.sent} // 인증코드 발송 후에는 수정 불가
              />
              <Button
                type='button'
                onClick={handleSendCode}
                disabled={!newEmail || state.isLoading || state.sent}
                className='bg-blue-600 hover:bg-blue-700'
              >
                {state.isLoading ? '전송 중...' : state.sent ? '전송 완료' : '인증 요청'}
              </Button>
            </div>
          </div>

          {/* 인증 코드 입력 */}
          {state.sent && !state.verified && (
            <div>
              <Label htmlFor='verification-code' className='text-sm font-medium'>
                인증 코드
              </Label>
              <div className='flex space-x-2'>
                <Input
                  id='verification-code'
                  type='text'
                  placeholder='이메일로 전송된 코드를 입력하세요'
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <Button
                  type='button'
                  onClick={handleVerify}
                  disabled={!verificationCode}
                  className='bg-green-600 hover:bg-green-700'
                >
                  인증하기
                </Button>
              </div>

              {state.timer > 0 && (
                <p className='mt-1 text-xs text-gray-500'>
                  남은 시간: {Math.floor(state.timer / 60)}분 {state.timer % 60}초
                </p>
              )}
            </div>
          )}

          {/* 인증 완료 상태 */}
          {state.verified && (
            <p className='text-sm font-medium text-green-600'>이메일 인증이 완료되었습니다 ✅</p>
          )}
        </div>

        <DialogFooter className='flex space-x-2'>
          <Button variant='outline' onClick={handleClose}>
            취소
          </Button>
          <Button
            onClick={handleUpdateEmail}
            disabled={!state.verified || updateEmail.isPending}
            className='bg-blue-600 hover:bg-blue-700'
          >
            {updateEmail.isPending ? '변경 중...' : '변경하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
