export const KakaoLoading = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-50'>
      {/* 스피너 */}
      <div className='mb-6 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-green-500'></div>
      {/* 텍스트 */}
      <p className='text-lg font-medium text-gray-700'>카카오 로그인 중입니다...</p>
    </div>
  );
};
