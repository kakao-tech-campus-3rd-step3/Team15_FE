// import React from 'react';
// import { Link } from 'react-router-dom';

// /**
//  * 휴쉼 스타일의 인증 사용자용 헤더
//  * - 상단 얇은 네비게이션 바 (좌: 섹션 링크, 우: 검색/알림/프로필)
//  * - 메인 헤더: 중앙 로고/브랜드
//  * - 상단 고정, 그림자, 반응형 패딩
//  */
// function HeaderAuth() {
//   return (
//     <header className='bg-primary sticky top-0 z-40 w-full text-black'>
//       <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
//         {/* Left: navigation links */}
//         <nav className='flex gap-6 text-sm font-medium'>
//           <Link to='/' className='hover:underline'>
//             휴쉼하나
//           </Link>
//           <Link to='/moods' className='hover:underline'>
//             휴쉼톡
//           </Link>
//           <Link to='/contents' className='hover:underline'>
//             콘텐츠
//           </Link>
//           <Link to='/news' className='hover:underline'>
//             휴쉼소식
//           </Link>
//         </nav>

//         {/* Center: brand logo */}
//         <div className='flex flex-1 items-center justify-center gap-1 text-xl font-extrabold'>
//           <Link to='/' className='inline-flex items-center gap-1'>
//             <span>휴쉼</span>
//             <svg
//               width='18'
//               height='18'
//               viewBox='0 0 24 24'
//               fill='currentColor'
//               className='text-black'
//               xmlns='http://www.w3.org/2000/svg'
//             >
//               <path d='M12 21s-7-4.35-9.33-8.21C.7 9.65 2.2 6 5.5 6c1.9 0 3.04 1.02 3.86 2.09C10.46 7.02 11.6 6 13.5 6c3.3 0 4.8 3.65 2.83 6.79C19 16.65 12 21 12 21z' />
//             </svg>
//           </Link>
//         </div>

//         {/* Right: search icon, login and playlist buttons */}
//         <div className='flex items-center gap-3'>
//           <button
//             aria-label='search'
//             className='rounded-full border border-black p-2 transition hover:bg-black/10'
//           >
//             <svg
//               width='18'
//               height='18'
//               viewBox='0 0 24 24'
//               fill='none'
//               xmlns='http://www.w3.org/2000/svg'
//               stroke='currentColor'
//               strokeWidth='2'
//               strokeLinecap='round'
//               strokeLinejoin='round'
//             >
//               <circle cx='11' cy='11' r='7' />
//               <line x1='21' y1='21' x2='16.65' y2='16.65' />
//             </svg>
//           </button>
//           <button className='rounded border border-black px-4 py-1 font-semibold hover:bg-black/10'>
//             로그인
//           </button>
//           <button className='rounded-full bg-black px-4 py-1 font-semibold text-rose-500 hover:bg-gray-900'>
//             플레이리스트
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default HeaderAuth;
