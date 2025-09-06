import { Search } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/button';
import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { navItems } from '../config/const';

function HeaderAuth() {
  const navigate = useNavigate();

  return (
    <header className='bg-primary sticky top-0 z-40 w-full text-black'>
      <div className='mx-auto grid h-14 w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6'>
        {/* 좌측 네비게이션 */}
        <nav className='col-start-1 hidden items-center gap-6 text-sm font-medium md:flex'>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              className='hover:opacity-80'
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* 중앙 로고 */}
        <div className='col-start-2 select-none justify-self-center'>
          <div className='flex items-center gap-2 text-xl font-extrabold tracking-tight'>
            <span>휴쉼</span>
            <span className='text-sm'></span>
          </div>
        </div>

        {/* 우측 유틸 */}
        <div className='col-start-3 flex items-center gap-2 justify-self-end'>
          {/* 검색 아이콘 버튼 */}
          <Button variant='ghost' size='icon' className='rounded-full hover:bg-black/5'>
            <Search className='h-5 w-5' />
          </Button>

          {/* 로그인 버튼 (연한 테두리 pill) */}
          <Button
            variant='outline'
            className='rounded-full border-black/20 bg-transparent text-black hover:bg-black/5'
          >
            로그인
          </Button>

          {/* 프로필 드롭다운 (로그인 시 표시) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='ml-1 cursor-pointer'>
                <Avatar>
                  {/* <AvatarImage src='/profile.png' /> */}
                  <AvatarFallback>FE</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>내 계정</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default HeaderAuth;
