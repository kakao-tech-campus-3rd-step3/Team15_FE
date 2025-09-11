import { AuthFormTabs } from '@/widgets/Auth';
import { AuthLayout } from './AuthLayout';

export function AuthPage() {
  return (
    <div className='from-primary-foreground to-primary flex min-h-screen items-center justify-center bg-gradient-to-br p-4 font-sans sm:p-6 md:p-0'>
      <AuthLayout>
        <AuthFormTabs />
      </AuthLayout>
    </div>
  );
}
