import { useUserProfile, useUserProfileEdit } from '@/entities/user';
import { useProfileStore } from '@/features/my/ChangeProfileInfo/model/useProfileStore';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { Award, Edit3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmallBadge from './SmallBadge';
import { StatCard } from '@/shared/ui/stat-card';
import { getLevelProgress } from '../util/levelUtils';

export const ProfileCard = () => {
  const { setIsModalOpen } = useProfileStore();
  const { data: profileEdit } = useUserProfileEdit();

  const { data, isPending, isError } = useUserProfile();
  if (isPending) return <div>로딩중...</div>;
  if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  const { user, stats, badges } = data ?? {}; //추후 select 이용해서 리팩토링

  // 데이터 가공
  const join = new Date(user.joinDate);
  const last = new Date(user.lastActiveDate);

  const diffMs = last.getTime() - join.getTime(); // 밀리초 차이
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 일 단위

  const joinDate = join.toLocaleDateString();

  const statsData = [
    { label: '작성글 수', value: stats.totalPosts, color: 'text-green-600' },
    { label: '댓글 수', value: stats.totalComments, color: 'text-orange-600' },
    { label: '좋아요 받은 수', value: stats.totalLikes, color: 'text-red-600' },
    { label: '완료한 미션', value: stats.totalMissionClear, color: 'text-blue-600' },
  ];
  const { progress, remainPercent } = getLevelProgress(user.points);

  return (
    <Card className='border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'>
      <CardHeader className='text-center'>
        <CardTitle className='mb-2 text-2xl font-bold text-green-700'>내 프로필</CardTitle>
        <p className='text-green-600'>나만의 공간을 꾸며보세요</p>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <Avatar className='h-20 w-20 border-4 border-white shadow-lg'>
              <AvatarFallback className='bg-green-500 text-xl text-white'>
                {user.nickname}
              </AvatarFallback>
            </Avatar>
            <div className='absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500'>
              <div className='h-2 w-2 rounded-full bg-white'></div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='mb-1 flex items-center space-x-2'>
              <h2 className='text-xl font-bold'>{user.nickname}</h2>
              <Badge variant='secondary' className='bg-green-100 text-green-700'>
                활동일: {diffDays}일
              </Badge>
            </div>
            <p className='mb-2 text-sm text-gray-600'>{profileEdit?.introduction}</p>
            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              <span>가입일: {joinDate}</span>
              <span>활동점수: {user.points}점</span>
              <span>레벨: {user.level}레벨</span>
            </div>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='border-green-300 bg-transparent text-green-700 hover:bg-green-50'
            onClick={() => setIsModalOpen(true)}
          >
            <Edit3 className='mr-1 h-4 w-4' />
            프로필 수정
          </Button>
        </div>

        {/* stat 섹션 */}
        <div className='grid grid-cols-4 gap-4'>
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='flex items-center font-semibold'>
              <Target className='mr-2 h-4 w-4 text-green-600' />
              성장 기록 🌱
            </h3>
            <span className='text-sm text-gray-500'>
              {user.level}레벨 → {user.level + 1}레벨
            </span>
          </div>
          <Progress value={progress} className='mb-2 h-3' />
          {/* 추후 테이블로 리팩토링 */}
          <p className='text-sm text-gray-600'>
            다음 레벨까지 {remainPercent.toFixed(1)}% 남았어요!
          </p>
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='flex items-center font-semibold'>
              <Award className='mr-2 h-4 w-4 text-yellow-600' />
              획득한 뱃지
            </h3>
            <Link to='/badges'>
              <Button variant='outline' size='sm'>
                자세히 보기
              </Button>
            </Link>
          </div>
          <div className='flex space-x-4'>
            {badges.map((badge) => (
              <SmallBadge key={badge.name} {...badge} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
