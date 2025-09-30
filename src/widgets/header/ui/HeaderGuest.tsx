import { Search } from 'lucide-react';
import { YSButton } from '@/shared/ui/';
import { useNavigate } from 'react-router-dom';
import { navItems } from '../config/const';
import { ROUTES } from '@/shared/config';

export function HeaderGuest() {
  const navigate = useNavigate();

  return (
    <header className='sticky top-0 z-40 w-full bg-white text-black'>
      <div className='mx-auto grid h-20 w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6'>
        {/* 좌측 네비게이션 */}
        <nav className='col-start-1 hidden items-center gap-3 md:flex'>
          {navItems.map((item) => (
            <YSButton
              key={item.path}
              onClick={() => navigate(item.path)}
              variant='link'
              className='text-xl'
            >
              {item.label}
            </YSButton>
          ))}
        </nav>

        {/* 중앙 로고 */}
        <div className='col-start-2 select-none justify-self-center'>
          <div className='text-primary flex items-center gap-2 text-4xl font-extrabold tracking-tight'>
            <span>휴쉼</span>
          </div>
        </div>

        {/* 우측 유틸 */}
        <div className='col-start-3 flex items-center gap-4 justify-self-end'>
          {/* 검색 아이콘 버튼 */}
          <YSButton variant='ghost' size='icon'>
            <Search className='h-6 w-6' />
          </YSButton>

          {/* 로그인 버튼 (연한 테두리 pill) */}
          <YSButton variant='outline' size='sm' onClick={() => navigate(ROUTES.login)}>
            로그인
          </YSButton>
          <YSButton variant='outline' size='sm' onClick={() => navigate(ROUTES.login)}>
            회원가입
          </YSButton>
        </div>
      </div>
    </header>
  );
}
