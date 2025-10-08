import { useState } from 'react';
import { CheckCircle, Target, Lock, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BadgeCard } from './BadgeCard';
import type { BadgeTabsProps } from '../types.ts/badge';

export function BadgeTabs({
  earnedBadges,
  progressBadges,
  lockedBadges,
  allBadges,
}: BadgeTabsProps) {
  const [activeTab, setActiveTab] = useState('earned');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Award className='mr-2 h-5 w-5' />
          뱃지 목록
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='earned' className='flex items-center space-x-2'>
              <CheckCircle className='h-4 w-4' />
              <span>획득한 뱃지</span>
            </TabsTrigger>
            <TabsTrigger value='progress' className='flex items-center space-x-2'>
              <Target className='h-4 w-4' />
              <span>진행 중</span>
            </TabsTrigger>
            <TabsTrigger value='locked' className='flex items-center space-x-2'>
              <Lock className='h-4 w-4' />
              <span>잠긴 뱃지</span>
            </TabsTrigger>
            <TabsTrigger value='all' className='flex items-center space-x-2'>
              <Medal className='h-4 w-4' />
              <span>전체 뱃지</span>
            </TabsTrigger>
          </TabsList>

          {/* 탭 내용 */}
          <TabsContent value='earned' className='mt-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='progress' className='mt-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {progressBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='locked' className='mt-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {lockedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value='all' className='mt-6'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {allBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
