'use client';

import { getEventDetailPage } from '@event-mobile-front/api';
import { queryKeys } from '@event-mobile-front/queryKey';
import { useQuery } from '@tanstack/react-query';
import { EventDetailContent } from '@event-mobile-front/template';
import dynamic from 'next/dynamic';
import { EventDetailResponse } from '@event-mobile-front/types';
import { ComponentType, FC, JSX } from 'react';

interface EventViewClientProps {
  eventId: number;
  templateKey: string;
}

interface EventDetailTemplateProps {
  data: EventDetailResponse;
}

export default function EventViewClient({eventId, templateKey}: EventViewClientProps) {
  const queryKey = queryKeys.event.detail(eventId);
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getEventDetailPage(eventId),
  });

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Empty here...</div>;

  // const TemplateComponent = dynamic<(props: EventDetailTemplateProps) => JSX.Element>(() =>
  //   import(`@/features/event/templates/${templateKey}/EventDetailTemplate`)
  // );

  return (
      <EventDetailContent data={data} />
      // <TemplateComponent data={data} />
  );
}



