import type { FooterSection, SocialLink } from '../model/footerType';

export const SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: '소개', href: '/about' },
      { label: '변경내역', href: '/changelog' },
      { label: '문서 / 가이드', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: '자주 묻는 질문', href: '/faq' },
      { label: '지원', href: '/support' },
      { label: '개인정보 처리방침', href: '/privacy' },
      { label: '이용약관', href: '/terms' },
    ],
  },
];

export const SOCIALS: SocialLink[] = [
  {
    href: 'https://github.com/kakao-tech-campus-3rd-step3/Team15_FE',
    label: 'GitHub',
    icon: <span className='text-lg'>🐙</span>,
  },
  { href: '#', label: 'Contact', icon: <span className='text-lg'>✉️</span> },
];

export const BOTTOMBAR_LINKS = [
  { label: '보안', href: '/security' },
  { label: '서비스 상태', href: '/status' },
  { label: '연락처', href: '/contact' },
];
