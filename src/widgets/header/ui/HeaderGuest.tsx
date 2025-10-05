import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HEADER_NAV_ITEMS } from '../config/const';
import { ROUTES } from '@/shared/config';
import { Button } from '@/shared/ui/shadcn/button';

export function HeaderGuest() {
  const navigate = useNavigate();

  return (
    <header className='sticky top-0 z-40 w-full bg-white text-black'>
      <div className='mx-auto grid h-20 w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6'>
        {/* 좌측 네비게이션 */}
        <nav className='col-start-1 hidden items-center gap-3 md:flex'>
          {HEADER_NAV_ITEMS.map((item) => (
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
        <div
          className='col-start-2 cursor-pointer select-none justify-self-center transition-transform hover:scale-105 hover:opacity-80'
          onClick={() => navigate(ROUTES.landing)}
        >
          <div className='text-primary flex items-center gap-2 text-4xl font-extrabold tracking-tight'>
            <span>휴쉼</span>
          </div>
        </div>

        {/* 우측 유틸 */}
        <div className='col-start-3 flex items-center gap-4 justify-self-end'>
          {/* 검색 아이콘 버튼 */}
          <Button variant='ghost' size='icon'>
            <Search className='h-6 w-6' />
          </Button>

          {/* 로그인 버튼 (연한 테두리 pill) */}
          <Button variant='outline' size='sm' onClick={() => navigate(ROUTES.login)}>
            로그인
          </Button>
          <Button variant='outline' size='sm' onClick={() => navigate(ROUTES.login)}>
            회원가입
          </Button>
        </div>
      </div>
    </header>
  );
}
