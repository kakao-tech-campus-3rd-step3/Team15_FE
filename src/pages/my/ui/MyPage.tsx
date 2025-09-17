import { ProfileCard } from '@/widgets/ProfileCard';
import { ActivityTabs } from '@/widgets/ActivityTabs';
import { PersonalSettings } from '@/widgets/PersonalSettings';

import ChangeEmailDialog from '@/features/my/ChangeEmail/ui/ChangeEmailDialog';
import ChangePasswordDialog from '@/features/my/ChangePassword/ui/ChangePasswordDialog';
import DeleteAccountDialog from '@/features/my/DeleteAccount/ui/DeleteAccountDialog';

export function MyPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-4xl space-y-6 px-4'>
        <ProfileCard />
        <ActivityTabs />
        <PersonalSettings />
      </div>

      <ChangeEmailDialog />
      <ChangePasswordDialog />
      <DeleteAccountDialog />
    </div>
  );
}
