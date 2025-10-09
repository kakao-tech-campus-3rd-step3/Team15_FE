// src/shared/ui/animations/PageEnter.tsx
import React, { useEffect, useRef, useState } from 'react';

/**
 * PageEnter
 * - 메인/랜딩 진입 시 한 번만 자연스러운 페이드/슬라이드 인 애니메이션을 적용하는 래퍼
 * - Tailwind(shadcn 스타일) 기반. prefers-reduced-motion 대응.
 * - once="session"(기본): 세션당 1회만 재생. "always": 매 마운트마다 재생. "none": 비활성화.
 */
export function PageEnter({
  children,
  className = '',
  durationMs = 600,
  offset = 12, // px, 살짝 아래에서 올라오는 느낌
  once = 'session',
}: {
  children: React.ReactNode;
  className?: string;
  durationMs?: number;
  offset?: number;
  once?: 'session' | 'always' | 'none';
}) {
  const [ready, setReady] = useState(false);
  const playedKey = 'page_enter_played_v1';
  const skip =
    once === 'none' ||
    (once === 'session' &&
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(playedKey) === '1');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (skip) return;
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useEffect(() => {
    if (ready && once === 'session') {
      try {
        sessionStorage.setItem(playedKey, '1');
      } catch {}
    }
  }, [ready, once]);

  // reduced motion: 애니메이션 최소화
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const base = [
    'transition-all',
    `duration-[${durationMs}ms]`,
    'ease-out',
    'will-change-transform will-change-opacity',
  ].join(' ');

  const initial = `opacity-0 translate-y-[${offset}px]`;
  const final = 'opacity-100 translate-y-0';

  const stateClass = reduceMotion || skip ? final : ready ? final : initial;

  return (
    <div ref={ref} className={[base, stateClass, className].join(' ')} data-enter-ready={ready}>
      {children}
    </div>
  );
}
