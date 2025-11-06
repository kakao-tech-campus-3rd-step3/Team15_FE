import { useState } from 'react';
import { Button } from '@/shared/ui//button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui//dialog';
import { Badge } from '@/shared/ui//badge';
import { Bell, CheckCheck } from 'lucide-react';
import { NotificationList } from './NotificationList';
import { useUnreadNotificationCount } from '../api/useUnreadNotificationCount';
import { useNotifications } from '../api/useNotifications';
import { useMarkNotificationAsRead } from '../api/useMarkNotificationAsRead';
import { useMarkAllNotificationsAsRead } from '../api/useMarkAllNotificationsAsRead';
import { useDeleteNotification } from '../api/useDeleteNotification';

export function NotificationModal() {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기 전에 알림 갯수 가져오기
  const { data } = useUnreadNotificationCount();
  const unreadCount = data?.unreadCount ?? 0;

  const { data: notifications = [] } = useNotifications();
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllMutation = useMarkAllNotificationsAsRead();
  const deleteMutation = useDeleteNotification();

  // 단건 읽음
  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };

  // 전부 읽음
  const handleMarkAllAsRead = () => {
    markAllMutation.mutate();
  };

  // 삭제
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='icon' className='relative bg-transparent'>
          <Bell className='h-5 w-5' />
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs'
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='flex max-h-[80vh] max-w-md flex-col p-0'>
        <DialogHeader className='flex-shrink-0 border-b p-4 pr-12'>
          <div className='flex flex-col gap-3'>
            <DialogTitle className='flex items-center gap-2'>
              <Bell className='h-5 w-5' />
              알림
              {unreadCount > 0 && (
                <Badge variant='secondary' className='ml-2'>
                  {unreadCount}개 안 읽음
                </Badge>
              )}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleMarkAllAsRead}
                className='w-fit bg-transparent text-green-600'
              >
                <CheckCheck className='mr-1 h-4 w-4' />
                전부 읽음
              </Button>
            )}
          </div>
        </DialogHeader>
        <NotificationList
          notifications={notifications}
          handleDelete={handleDelete}
          handleMarkAsRead={handleMarkAsRead}
        />
      </DialogContent>
    </Dialog>
  );
}
