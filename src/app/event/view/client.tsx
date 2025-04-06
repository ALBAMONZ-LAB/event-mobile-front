'use client';

import { getEventDetailPage } from '@event-mobile-front/api';
import { Header } from '@event-mobile-front/components';
import { queryKeys } from '@event-mobile-front/queryKey';
import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EventViewClient() {
  const searchParams = useSearchParams();
  const eventId = Number(searchParams.get('eventId'));

  const [queryClient] = useState(() => new QueryClient());

  if (Number.isNaN(eventId)) return <div>잘못된 접근입니다</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <PrefetchAndRender eventId={eventId} />
    </QueryClientProvider>
  );
}

// prefetchQuery 를 server component에서 안하고 client component에서한 이유 물어보기!
function PrefetchAndRender({ eventId }: { eventId: number }) {
  const [ready, setReady] = useState(false);
  const [dehydratedState, setDehydratedState] = useState<DehydratedState | null>(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    queryClient
      .prefetchQuery({
        queryKey: queryKeys.event.detail(eventId),
        queryFn: () => getEventDetailPage(eventId),
      })
      .then(() => {
        const state = dehydrate(queryClient);
        setDehydratedState(state);
        setReady(true);
      });
  }, [eventId]);

  if (!ready) return <div>Hydrating...</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <EventDetailContent eventId={eventId} />
    </HydrationBoundary>
  );
}

function EventDetailContent({ eventId }: { eventId: number }) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.event.detail(eventId),
    queryFn: () => getEventDetailPage(eventId),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <>
      <Header title={data.pageJson.header} />
      <div>{JSON.stringify(data.pageJson.body)}</div>
    </>
  );
}
