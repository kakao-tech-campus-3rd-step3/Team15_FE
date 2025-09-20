import { useProfileStore } from '@/features/my/ChangeProfileInfo/model/useProfileStore';
import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/avatar';
import { Badge } from '@/shared/ui/shadcn/badge';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Progress } from '@/shared/ui/shadcn/progress';
import { Award, Edit3, Flame, Heart, MessageCircle, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfileCard = () => {
  const { setIsModalOpen } = useProfileStore();

  const userStats = {
    posts: 12,
    comments: 89,
    likes: 7,
    daysActive: 3,
    completeMission: 26,
  };
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
              {/* <AvatarImage src='/profileImage.png' /> */}
              <AvatarFallback className='bg-green-500 text-xl text-white'>새싹이</AvatarFallback>
            </Avatar>
            <div className='absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500'>
              <div className='h-2 w-2 rounded-full bg-white'></div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='mb-1 flex items-center space-x-2'>
              <h2 className='text-xl font-bold'>새싹이</h2>
              <Badge variant='secondary' className='bg-green-100 text-green-700'>
                활동일: {userStats.daysActive}일
              </Badge>
            </div>
            <p className='mb-2 text-sm text-gray-600'>함께 성장하는 것을 좋아해요! 🌱</p>
            <div className='flex items-center space-x-4 text-sm text-gray-500'>
              <span>가입일: 2024.03.15</span>
              <span>활동점수: 2,340점</span>
              <span>레벨: 4레벨</span>
            </div>
          </div>
          <Button
            variant='outline'
            size='sm'
            className='border-green-300 bg-transparent text-green-700 hover:bg-green-50'
            asChild
          >
            <Button variant='outline' size='sm' onClick={() => setIsModalOpen(true)}>
              <Edit3 className='mr-1 h-4 w-4' />
              프로필 수정
            </Button>
          </Button>
        </div>

        <div className='grid grid-cols-4 gap-4'>
          <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-green-600'>{userStats.posts}</div>
            <div className='text-sm text-gray-600'>작성글 수</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-orange-600'>{userStats.comments}</div>
            <div className='text-sm text-gray-600'>댓글 수</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-red-600'>{userStats.likes}</div>
            <div className='text-sm text-gray-600'>좋아요 받은 수</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow-sm'>
            <div className='text-2xl font-bold text-blue-600'>{userStats.completeMission}</div>
            <div className='text-sm text-gray-600'>완료한 미션</div>
          </div>
        </div>

        <div className='rounded-lg bg-white p-4 shadow-sm'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='flex items-center font-semibold'>
              <Target className='mr-2 h-4 w-4 text-green-600' />
              성장 기록 🌱
            </h3>
            <span className='text-sm text-gray-500'>레벨 → 5레벨</span>
          </div>
          <Progress value={75} className='mb-2 h-3' />
          <p className='text-sm text-gray-600'>다음 레벨까지 25% 남았어요!</p>
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
            <div className='text-center'>
              <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100'>
                <Trophy className='h-6 w-6 text-yellow-600' />
              </div>
              <span className='text-xs text-gray-600'>첫 글쓰기</span>
            </div>
            <div className='text-center'>
              <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
                <Heart className='h-6 w-6 text-red-600' />
              </div>
              <span className='text-xs text-gray-600'>7일 연속 접속</span>
            </div>
            <div className='text-center'>
              <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                <MessageCircle className='h-6 w-6 text-blue-600' />
              </div>
              <span className='text-xs text-gray-600'>성실한 댓글러</span>
            </div>
            <div className='text-center'>
              <div className='mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                <Flame className='h-6 w-6 text-purple-600' />
              </div>
              <span className='text-xs text-gray-600'>인기글 작성</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
