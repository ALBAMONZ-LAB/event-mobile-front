'use client';

import { getEventDetailPage } from '@event-mobile-front/api';
import { queryKeys } from '@event-mobile-front/queryKey';
import { useQuery } from '@tanstack/react-query';
import { EventDetailContent } from '@event-mobile-front/template';

export default function EventViewClient({eventId}: {eventId: number}) {
  const queryKey = queryKeys.event.detail(eventId);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getEventDetailPage(eventId),
  });

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Empty here...</div>;

  return (
      <EventDetailContent data={data} />
  );
}



