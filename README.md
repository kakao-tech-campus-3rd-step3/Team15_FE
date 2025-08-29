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
