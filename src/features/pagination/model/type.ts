export type Props = {
  page: number; // 0-based
  totalPages: number; // 전체 페이지 수
  onChange: (next: number) => void;
  windowSize?: number; // 가운데에 보여줄 페이지 개수(짝수/홀수 무관)
};
