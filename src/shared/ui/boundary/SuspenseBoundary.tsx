import * as React from 'react';

export function SuspenseBoundary({
  fallback,
  children,
}: {
  fallback: React.ReactNode;
  children: React.ReactNode;
}) {
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
}
