import EventDetailClient from './client';
import { getEventDetailPage } from '@event-mobile-front/api';
import { Header } from '@event-mobile-front/components';
import { EventDetailResponse } from '@event-mobile-front/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { queryKeys } from '@event-mobile-front/queryKey';

const eventId = 3;

export default async function EventViewPage() {
  const queryClient = new QueryClient();
  const queryKey = queryKeys.event.detail(eventId)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getEventDetailPage(eventId),
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
          <EventDetailClient eventId={eventId} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
