import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getEventDetailPage } from '@event-mobile-front/api';
import { Header } from '@event-mobile-front/components';
import { EventDetailResponse } from '@event-mobile-front/types';

export default async function EventViewPage() {
  const queryClient = new QueryClient();
  const queryKey = ['event', 1];

  await queryClient.prefetchQuery({
    queryKey: ['event', 1],
    queryFn: () => getEventDetailPage(1),
  });

  const eventData = queryClient.getQueryData<EventDetailResponse>(queryKey);
  if (!eventData) {
    notFound(); // 404
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Header title={eventData.pageJson.header} />
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<div>Loading...</div>}>
          <div>로딩완료</div>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
