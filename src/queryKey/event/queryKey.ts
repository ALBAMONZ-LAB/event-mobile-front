export const queryKeys = {
  event: {
    all: ['event'] as const, // 전체 목록
    detail: (id: number) => ['event', id] as const,
  },
};
