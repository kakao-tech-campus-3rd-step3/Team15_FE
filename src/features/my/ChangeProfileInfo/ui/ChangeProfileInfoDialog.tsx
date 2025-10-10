import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/avatar';
import { Button } from '@/shared/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/shadcn/dialog';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { Save, X } from 'lucide-react';
import { useProfileStore } from '../model/useProfileStore';

const ChangeProfileInfoDialog = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    profileData,
    handleInputChange,
    handleSave,
    handleCancel,
    isChanged,
  } = useProfileStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        <div className='space-y-6 py-4'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-16 w-16 border-2 border-green-200'>
              <AvatarFallback className='bg-green-500 text-lg text-white'>
                {profileData.nickname.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className='font-medium'>프로필 미리보기</h3>
              <p className='text-sm text-gray-600'>닉네임 첫 2글자가 표시됩니다</p>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='nickname'>닉네임 *</Label>
            <Input
              id='nickname'
              value={profileData.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              placeholder='닉네임을 입력하세요'
            />
            <p className='text-xs text-gray-500'>2-20자 이내로 입력해주세요</p>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bio'>자기소개</Label>
            <Textarea
              id='bio'
              value={profileData.introduction}
              onChange={(e) => handleInputChange('introduction', e.target.value)}
              placeholder='자신을 소개해보세요'
              rows={3}
              maxLength={200}
            />
            <p className='text-right text-xs text-gray-500'>
              {profileData.introduction.length}/200자
            </p>
          </div>

          <div className='flex justify-end space-x-2 pt-4'>
            <Button variant='outline' onClick={handleCancel}>
              <X className='mr-2 h-4 w-4' />
              취소
            </Button>
            <Button
              onClick={handleSave}
              className='bg-green-600 hover:bg-green-700'
              disabled={!isChanged}
            >
              <Save className='mr-2 h-4 w-4' />
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeProfileInfoDialog;
