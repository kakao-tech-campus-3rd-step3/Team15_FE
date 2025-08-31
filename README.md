# Team15_FE

## 팀원 소개

|                                 프로필 이미지                                 |  이름  |         역할         |                     GitHub                      |
| :---------------------------------------------------------------------------: | :----: | :------------------: | :---------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/73772126?v=4" width="100">  | 박영서 | Frontend Tech Leader |     [givpro22](https://github.com/givpro22)     |
| <img src="https://avatars.githubusercontent.com/u/109673353?v=4" width="100"> | 박진현 |       Frontend       | [jinhyun71744](https://github.com/jinhyun71744) |

---

## 프로젝트 실행 방법

```bash
# 레포지토리 클론
git clone git@github.com:kakao-tech-campus-3rd-step3/Team15_FE.git

# 프로젝트 폴더로 이동
cd Team15_FE

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

---

## 브랜치 전략

### 브랜치 관리

- `main`
  - 모든 피드백이 반영된 최종 산출 코드 관리(배포 기준)

- `develop`
  - 통합 개발 브랜치(기능 병합 전 중간 안정화)
  - PR 타겟: `feature/*`, `refactor/*`, `docs/*`, `setting/*` → `develop`

- `feature/*`
  - 기능 단위 개발 브랜치
  - 예: `feature/auth-login`, `feature/mission-detail`
  - 완료 시 `develop`으로 PR

- `refactor/*`
  - 멘토 피드백/구조 개선 반영 브랜치(기능 추가 없음)
  - 예: `refactor/remove-magic-number`, `refactor/dto-split`

- `docs/*`
  - 문서/스토리북/가이드/ADR 등 문서화 작업 전용
  - 예: `docs/readme-team-intro`, `docs/api-spec-v1`, `docs/storybook-setup`
  - 산출물: README, 컨트리뷰팅 가이드, API 명세, 디자인 토큰 문서 등

- `setting/*`
  - 리포지토리/빌드/CI/CD/툴링/환경설정 전용(코드 로직 변경 X)
  - 예: `setting/eslint-prettier`, `setting/gh-actions-ci`, `setting/husky-commitlint`
  - 커밋 타입 권장: `chore:`, `build:`, `ci:` 등

### 기능 개발

1. 새로운 기능, 페이지를 구현한다면 feature/기능 이름으로 새로운 브랜치를 생성해주세요. e.g. feature/LandingPage

2. 해당 브랜치에서 기능을 개발하세요

3. 개발이 끝나면 PR 템플릿 형식에 맞춰 PR을 생성해주세요 (병합 방향은 `feature/*` -> `develop`)

- **다른 사람의 PR이 올라오면 피어 리뷰를 해주세요.**

---

## 기술 스택

### 주요 라이브러리

- **상태 관리**
  - [@tanstack/react-query](https://tanstack.com/query/latest)
  - [zustand](https://github.com/pmndrs/zustand)

- **라우팅**
  - [react-router-dom](https://reactrouter.com/)

- **스타일링**
  - [tailwindcss](https://tailwindcss.com/)
  - [@tailwindcss/vite](https://tailwindcss.com/docs/guides/vite)
  - [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

- **폼 & 검증**
  - [react-hook-form](https://react-hook-form.com/)
  - [zod](https://zod.dev/)

- **유틸리티**
  - [axios](https://axios-http.com/)
  - [dayjs](https://day.js.org/)
  - [lucide-react](https://lucide.dev/)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
  - [@fullcalendar/react](https://fullcalendar.io/)
  - [react-hot-toast](https://react-hot-toast.com/)

### 테스트 & Mocking

- [msw (Mock Service Worker)](https://mswjs.io/)

### 개발 환경 & 코드 품질

- [prettier](https://prettier.io/)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [husky](https://typicode.github.io/husky)
- [lint-staged](https://github.com/okonet/lint-staged)
- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped)

---

## 프로젝트 구조 (FSD: Feature-Sliced Design)

본 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 기반으로 구성되어 있습니다.
![FSD 구조 다이어그램](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fvscch6q7ej44oxkwensa.jpg)

### 주요 계층

- **app/**  
  애플리케이션 전역 설정 (Provider, Router, 전역 스타일 등)

- **pages/**  
  라우팅 기준의 페이지 단위 (한 화면 단위, 여러 feature 조합)

- **features/**  
  사용자 가치를 가지는 독립 기능 단위 (ex: 로그인, 댓글 작성)

- **entities/**  
  비즈니스 도메인/핵심 모델 단위 (ex: User, Post, Mission)

- **shared/**  
  전역적으로 재사용 가능한 코드 (UI 컴포넌트, hooks, lib, utils 등)

---

## 환경 변수 및 개발 환경 설정

### 1️. 환경 변수 파일 구성

프로젝트 루트에 환경별 `.env` 파일을 생성합니다.

```
.env                 # 공통 환경 변수
.env.development     # 개발 환경 전용
.env.production      # 배포 환경 전용
```

**예시**

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK=true

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
```

- `VITE_` 접두사는 **Vite에서 env 변수를 인식**하도록 필수입니다.
- `VITE_USE_MOCK` : MSW(Mock Service Worker) 활성화 여부 제어
- `VITE_API_BASE_URL` : API 요청 기본 URL

---

### 2️. 환경 구분 사용 가이드

```ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
  useMock: import.meta.env.VITE_USE_MOCK === true,
} as const;

export const isLocalStage = import.meta.env.MODE === 'development';
export const isProductionStage = import.meta.env.MODE === 'production';
```

- config를 통해 정의된 환경 변수를 import 하여 사용 가능
- Vite 기본 제공 환경 변수
  - import.meta.env.MODE → 현재 모드 ("development" | "production" | "test")
  - import.meta.env.DEV → 개발 서버 실행 중일 때 true
  - import.meta.env.PROD → 빌드된 배포 환경일 때 true
- 기본 제공되지만, 가독성과 명시적 표현을 위해 isLocalStage, isProductionStage 같은 헬퍼 변수를 정의해서 사용
