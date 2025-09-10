import { AuthFormTabs } from '@/widgets/Auth';
import { AuthLayout } from './AuthLayout';

export function AuthPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-400 p-4 font-sans sm:p-6 md:p-0'>
      <AuthLayout>
        <AuthFormTabs />
      </AuthLayout>
    </div>
  );
}
