import EventDetailClient from './client';
import { getEventDetailPage } from '@event-mobile-front/api';
import { Header } from '@event-mobile-front/components';
import { EventDetailResponse } from '@event-mobile-front/types';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { queryKeys } from '@event-mobile-front/queryKey';

interface EventViewPageProps {
  params?: Promise<{ eventId: string }>;
}

export default async function EventViewPage({ params }: EventViewPageProps) {
  const queryClient = new QueryClient();
  // TODO 추후 api 도 수정이 필요함
  const eventId = Number((await params)?.eventId);
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
