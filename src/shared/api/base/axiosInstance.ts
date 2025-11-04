//axios 설정 (baseURL, interceptors)
import axios, { AxiosHeaders, type AxiosRequestConfig, type RawAxiosRequestHeaders } from 'axios';
import { ApiError } from '../../errors/ApiError';

export const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true, //클라이언트(브라우저)가 서버로 요청을 보낼 때 쿠키(refresh token)를 포함하도록 지정
});

// 내부 재시도 표시용 확장 타입
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

// 타입 안전한 Authorization 헤더 설정 유틸
const setAuthHeader = (config: AxiosRequestConfig, token: string) => {
  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else if (config.headers) {
    (config.headers as RawAxiosRequestHeaders).Authorization = `Bearer ${token}`;
  } else {
    config.headers = { Authorization: `Bearer ${token}` } as RawAxiosRequestHeaders;
  }
};

// 토큰이 필요 없는 경로 규칙 (메서드 + 패턴)
type PublicRule = { pattern: RegExp; methods?: string[] };
const publicRules: PublicRule[] = [
  // 인증 관련 (POST 허용)
  { pattern: /^\/auth\/login$/, methods: ['post'] },
  { pattern: /^\/auth\/refresh$/, methods: ['post'] },

  // 게시글 상세 조회 (GET만, 숫자 id)
  { pattern: /^\/posts\/\d+(\/)?(\?.*)?$/, methods: ['get'] },

  // 기타 공개 GET API
  { pattern: /^\/posts\/categories(\/)?(\?.*)?$/, methods: ['get'] },

  // 게시글 카테고리/검색/통계/코멘트 조회
  { pattern: /^\/posts\/categories(\/)?(\?.*)?$/, methods: ['get'] }, // already present (kept)
  { pattern: /^\/posts\/category\/[^/]+(\/)?(\?.*)?$/, methods: ['get'] }, // /posts/category/{category}?page=0
  { pattern: /^\/posts\/stats(\/)?(\?.*)?$/, methods: ['get'] }, // already present (kept)
  { pattern: /^\/posts\/search(\/)?(\?.*)?$/, methods: ['get'] }, // /posts/search?keyword=
  { pattern: /^\/posts\/\d+\/comments(\/)?(\?.*)?$/, methods: ['get'] }, // /posts/{postId}/comments

  // 댓글/대댓글 조회
  { pattern: /^\/comments\/\d+\/replies(\/)?(\?.*)?$/, methods: ['get'] }, // /comments/{parentId}/replies
  { pattern: /^\/comments\/\d+(\/)?(\?.*)?$/, methods: ['get'] }, // /comments/{id}

  // 신고 사유 조회
  { pattern: /^\/reports\/reasons(\/)?(\?.*)?$/, methods: ['get'] },

  // 지원사업 조회
  { pattern: /^\/support-programs(\/)?(\?.*)?$/, methods: ['get'] }, // /support-programs
  { pattern: /^\/support-programs\/[^/]+(\/)?(\?.*)?$/, methods: ['get'] }, // /support-programs/{type} or {programId}
  { pattern: /^\/support-programs\/count(\/)?(\?.*)?$/, methods: ['get'] }, // /support-programs/count
  // 오타 대비 (/supprot-programs/count)
  { pattern: /^\/supprot-programs\/count(\/)?(\?.*)?$/, methods: ['get'] },
];

// 현재 요청이 공개 규칙에 맞는지 검사
const isPublicRequest = (url?: string, method?: string) => {
  if (!url) return false;
  const target = url; // 정규식이 쿼리까지 포함하도록 작성됨
  const m = (method ?? 'get').toLowerCase();
  return publicRules.some((rule) => {
    if (rule.methods && !rule.methods.includes(m)) return false;
    return rule.pattern.test(target);
  });
};

axiosInstance.interceptors.request.use(
  (config) => {
    // 메서드/패턴 기반 공개 경로 검사
    const publicAllowed = isPublicRequest(config.url ?? '', config.method);

    // 토큰이 있으면 항상 헤더에 첨부 (공개 API라도 개인화/권한 반영 가능)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAuthHeader(config, accessToken);
    }

    // 비공개 경로인데 토큰이 없으면 로그인으로 유도
    if (!publicAllowed && !accessToken) {
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication token is missing.'));
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
    const originalRequest = err.config as AxiosRequestConfigWithRetry; // 원래 요청 정보 저장 (+_retry 확장)
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
        setAuthHeader(originalRequest, newAccessToken);

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
    // 단, 비즈니스 로직 에러(비밀번호 변경 실패 등)는 제외
    if (err.response?.status === 401) {
      const errorCode = err.response.data?.code;
      // 비밀번호 변경 실패와 같은 비즈니스 로직 에러는 리다이렉트하지 않음
      if (errorCode === 'INVALID_PASSWORD') {
        return Promise.reject(err);
      }
      localStorage.removeItem('accessToken'); // 토큰 정리
      window.location.href = '/login';
    }

    // 공통 에러 래핑
    throw new ApiError(
      err.response?.status ?? 500,
      err.response?.data,
      (err.response?.data as { message?: string })?.message ?? '요청 실패',
    );
  },
);
