import { LoginForm, SignupForm } from '@/features/auth';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/shadcn/tabs';

export function AuthFormTabs() {
  return (
    <Tabs defaultValue='login' className='w-full'>
      {/* 탭 버튼 */}
      <TabsList className='flex h-12 w-full rounded-lg bg-gray-200 p-1'>
        <TabsTrigger
          value='login'
          className='flex-1 rounded-md py-3 font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow'
        >
          로그인
        </TabsTrigger>
        <TabsTrigger
          value='signup'
          className='flex-1 rounded-md py-3 font-medium text-gray-500 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow'
        >
          회원가입
        </TabsTrigger>
      </TabsList>

      {/* 탭 내용 */}
      <TabsContent value='login' className='mt-6'>
        <LoginForm />
      </TabsContent>
      <TabsContent value='signup' className='mt-6'>
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
}
