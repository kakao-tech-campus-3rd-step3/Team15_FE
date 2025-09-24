import { useUserProfile } from '@/entities/user';
import { useChangeEmail } from '@/features/my/ChangeEmail/model/useChangeEmail';
import { useChangePassword } from '@/features/my/ChangePassword/model/useChangePassword';
import { useDeleteAccount } from '@/features/my/DeleteAccount/model/useDeleteAccount';
import { formatDate } from '@/shared/lib/date';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Separator } from '@/shared/ui/shadcn/separator';
import { Switch } from '@/shared/ui/shadcn/switch';
import { Bell, Heart, Lock, Mail, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export const PersonalSettings = () => {
  const { open: openEmailDialog } = useChangeEmail();
  const { open: openPasswordDialog } = useChangePassword();
  const { open: openDeleteAccountDialog } = useDeleteAccount();

  const [newCommentNotification, setNewCommentNotification] = useState(false);
  const [likeNoticeNotification, setLikeNoticeNotification] = useState(false);

  const { data, isPending, isError } = useUserProfile();
  const { account } = data ?? {};

  useEffect(() => {
    if (account) {
      setNewCommentNotification(account.newCommentNotification);
      setLikeNoticeNotification(account.likeNoticeNotification);
    }
  }, [account]);

  if (isPending) return <div>로딩중...</div>;
  if (isError || !account) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <Card id='personal-settings'>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Settings className='mr-2 h-5 w-5' />
          개인정보 설정
        </CardTitle>
        <p className='text-sm text-gray-600'>계정 보안 및 개인정보를 관리하세요</p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>
          <h4 className='mb-3 flex items-center font-medium'>
            <Mail className='mr-2 h-4 w-4 text-gray-500' />
            이메일 주소
          </h4>
          <div className='space-y-3'>
            <div className='flex items-center justify-between rounded-lg border bg-gray-50 p-4'>
              <div>
                <div className='font-medium'>{account.email}</div>
                <div className='text-sm text-gray-500'>인증된 이메일</div>
              </div>
              <Button variant='outline' size='sm' onClick={openEmailDialog}>
                변경
              </Button>
            </div>
            <p className='text-xs text-gray-500'>
              이메일 변경 시 새 이메일로 인증 메일이 발송됩니다.
            </p>
          </div>
        </div>

        <div>
          <h4 className='mb-3 flex items-center font-medium'>
            <Lock className='mr-2 h-4 w-4 text-gray-500' />
            비밀번호
          </h4>
          <div className='space-y-3'>
            <div className='flex items-center justify-between rounded-lg border bg-gray-50 p-4'>
              <div>
                <div className='font-medium'>••••••••</div>
                <div className='text-sm text-gray-500'>
                  마지막 변경: {formatDate(account.passwordLastChanged)}
                </div>
              </div>
              <Button variant='outline' size='sm' onClick={openPasswordDialog}>
                변경
              </Button>
            </div>
            <p className='text-xs text-gray-500'>
              정기적인 비밀번호 변경으로 계정을 안전하게 보호하세요.
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className='mb-3 font-medium'>알림 설정</h4>
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Bell className='h-4 w-4 text-gray-500' />
                <span>새 댓글 알림</span>
              </div>
              <Switch
                checked={newCommentNotification}
                onCheckedChange={setNewCommentNotification}
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Heart className='h-4 w-4 text-gray-500' />
                <span>좋아요 알림</span>
              </div>
              <Switch
                checked={likeNoticeNotification}
                onCheckedChange={setLikeNoticeNotification}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className='mb-3 font-medium'>계정 관리</h4>
          <div className='space-y-2'>
            <Button
              variant='outline'
              className='w-full justify-start bg-transparent text-red-600 hover:text-red-700'
              onClick={openDeleteAccountDialog}
            >
              <User className='mr-2 h-4 w-4' />
              계정 탈퇴
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
