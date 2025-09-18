//axios 설정 (baseURL, interceptors)
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true, //클라이언트(브라우저)가 서버로 요청을 보낼 때 쿠키(refresh token)를 포함하도록 지정
});

// 토큰이 필요 없는 경로 목록
const publicPaths = ['/auth/login', '/auth/refresh'];

axiosInstance.interceptors.request.use(
  (config) => {
    // 현재 요청 URL이 publicPaths에 포함되어 있는지 확인
    const isPublicPath = publicPaths.some((path) => config.url?.startsWith(path));

    // 토큰이 필요 없는 경로가 아니면, 액세스 토큰을 헤더에 추가
    if (!isPublicPath) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        // 공개 경로가 아닌데 토큰이 없다면 로그인 페이지로 리다이렉트 후 에러를 발생
        window.location.href = '/login';
        return Promise.reject(new Error('Authentication token is missing.'));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 서버 응답 인터셉터
axiosInstance.interceptors.response.use(
  (res) => res, //성공 응답 반환
  async (err) => {
    const originalRequest = err.config; //원래 요청 정보 저장
    // 401 에러 && 재요청 시도가 아닌 경우
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (err.response.data?.code === 'LOGIN_FAILED') {
        // 로그인 실패: refresh 시도 NO
        return Promise.reject(err);
      }

      originalRequest._retry = true;

      try {
        // 1. 토큰 갱신 API 호출
        const refreshResponse = await axiosInstance.post('/auth/refresh'); //미구현 api

        // 2. 새로운 토큰을 직접 저장
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 3. 원래 요청의 헤더를 새 토큰으로 업데이트
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 4. 원래 요청을 새로운 토큰으로 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        // refresh 토큰도 만료되었거나 실패한 경우
        console.error('Token refresh failed:', refreshErr);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    // 401 에러만 로그인 페이지로 리다이렉트
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken'); // 토큰 정리
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);
