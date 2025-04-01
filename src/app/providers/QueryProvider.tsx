'use client'; // 클라이언트에서만 실행되도록 설정

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
      gcTime: 1000 * 60 * 10,
      retry: 1, // 실패 시 1회 재시도
      refetchOnWindowFocus: false, // 창 포커스 시 자동 새로고침 비활성화
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
