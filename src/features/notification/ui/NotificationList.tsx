import { Bell, Check, Trash2 } from 'lucide-react';
import { Badge } from '@/shared/ui//badge';
import { Button } from '@/shared/ui/button';
import { getTypeColor, getTypeLabel } from '../lib/notificationUtils';
import type { Notification } from '../types/notification';
import { formatDateRelative } from '@/shared/lib/date';
import { useNavigate } from 'react-router-dom';
import { getTargetUrl } from '../lib/getTargetUrl';

interface TempProps {
  notifications: Notification[];
  handleMarkAsRead: (id: number) => void;
  handleDelete: (id: number) => void;
  setIsOpen: (open: boolean) => void;
}

export const NotificationList = ({
  notifications,
  handleMarkAsRead,
  handleDelete,
  setIsOpen,
}: TempProps) => {
  const navigate = useNavigate();
  const handleCardClick = (notification: Notification) => {
    const url = getTargetUrl(notification);
    setIsOpen(false);
    navigate(url);
  };
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='space-y-3 p-4'>
        {notifications.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>
            <Bell className='mx-auto mb-4 h-12 w-12 text-gray-300' />
            <p>알림이 없습니다</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleCardClick(notification)}
              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                notification.read
                  ? 'bg-white hover:bg-gray-50'
                  : 'border-green-200 bg-green-50 hover:bg-green-100'
              }`}
            >
              <div className='mb-2 flex items-start justify-between'>
                <div className='flex flex-1 items-center gap-2'>
                  <Badge className={getTypeColor(notification.type)} variant='secondary'>
                    {getTypeLabel(notification.type)}
                  </Badge>
                  {!notification.read && (
                    <div className='h-2 w-2 animate-pulse rounded-full bg-green-500'></div>
                  )}
                </div>
                <span className='text-xs text-gray-500'>
                  {formatDateRelative(notification.createdAt)}
                </span>
              </div>

              <h4 className='mb-1 font-semibold text-gray-900'>{notification.payload}</h4>

              <div className='mt-2 flex items-center gap-2'>
                {!notification.read && (
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 버블링 방지
                      handleMarkAsRead(notification.id);
                    }}
                    className='border-green-300 text-green-600 hover:bg-green-50'
                  >
                    <Check className='mr-1 h-3 w-3' />
                    읽음
                  </Button>
                )}
                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 시 카드 이동 막기
                    handleDelete(notification.id);
                  }}
                  className='border-red-300 text-red-600 hover:bg-red-50'
                >
                  <Trash2 className='mr-1 h-3 w-3' />
                  삭제
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
