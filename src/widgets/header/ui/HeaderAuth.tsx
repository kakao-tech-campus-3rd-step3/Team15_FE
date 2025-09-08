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
import { useState } from 'react';

function HeaderAuth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 임시로 상태 추가

  return (
    <header className='sticky top-0 z-40 w-full bg-white text-black'>
      <div className='mx-auto grid h-20 w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6'>
        {/* 좌측 네비게이션 */}
        <nav className='col-start-1 hidden items-center gap-3 md:flex'>
          {navItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              variant='link'
              className='text-xl'
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* 중앙 로고 */}
        <div className='col-start-2 select-none justify-self-center'>
          <div className='text-primary flex items-center gap-2 text-4xl font-extrabold tracking-tight'>
            <span>휴쉼</span>
          </div>
        </div>

        {isLoggedIn ? (
          <>
            {/* 프로필 드롭다운 (로그인 시 표시) */}
            <div className='col-start-3 flex items-center gap-4 justify-self-end'>
              <Button variant='outline' size='sm'>
                로그아웃
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='ml-1 cursor-pointer'>
                    <Avatar>
                      <AvatarFallback>FE</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuItem>내 계정</DropdownMenuItem>
                  <DropdownMenuItem>설정</DropdownMenuItem>
                  <DropdownMenuItem>로그아웃</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
            {/* 우측 유틸 */}
            <div className='col-start-3 flex items-center gap-4 justify-self-end'>
              {/* 검색 아이콘 버튼 */}
              <Button variant='ghost' size='icon'>
                <Search className='h-6 w-6' />
              </Button>

              {/* 로그인 버튼 (연한 테두리 pill) */}
              <Button variant='outline' size='sm'>
                로그인
              </Button>
              <Button variant='outline' size='sm'>
                회원가입
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderAuth;
