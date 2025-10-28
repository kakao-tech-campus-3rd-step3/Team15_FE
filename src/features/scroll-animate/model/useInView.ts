import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver 기반 가시성 훅
 *
 * 안전한 패턴:
 * 1) 등록(register): 콜백 ref 내부에서 즉시 observer.observe(node)
 * 2) 해제(cleanup):
 *    - ref가 null로 바뀌거나 노드 교체 시: 이전 observer.disconnect()
 *    - 컴포넌트 언마운트 시: useEffect cleanup에서 최종 disconnect()
 *
 * 이 방식은 다음 이슈를 피합니다:
 * - useEffect-only 패턴의 등록 타이밍 지연 (DOM commit 이후 한 틱)
 * - 노드 교체/리렌더 시 재등록 누락
 * - React 18 Strict Mode에서의 중복 등록
 */
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  once: boolean = true,
) {
  const [inView, setInView] = useState(false);

  // 현재 관찰 중인 DOM 노드와 observer 인스턴스를 보관
  const nodeRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      // 1) 기존 관찰 해제 (노드 교체/언마운트 시점 포함)
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      nodeRef.current = node;

      // 2) 새 노드 등록
      if (node) {
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) {
              // 한 번만 보고 끊기
              io.unobserve(node);
            }
          } else if (!once) {
            setInView(false);
          }
        }, options);

        observerRef.current = io;
        io.observe(node);
      }
    },
    [options, once],
  );

  // 컴포넌트 언마운트 시 최종 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return { ref, inView } as const;
}
