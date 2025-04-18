'use client';

import { getEventDetailPage } from '@event-mobile-front/api';
import { queryKeys } from '@event-mobile-front/queryKey';
import { useQuery } from '@tanstack/react-query';
import { EventDetailResponse } from '@event-mobile-front/types';
import { JSX } from 'react';
import dynamic from 'next/dynamic';

interface EventViewClientProps {
  eventId: number;
}

interface EventDetailTemplateProps {
  data: EventDetailResponse;
}

type TemplateImportFn = () => Promise<{
  default: (props: EventDetailTemplateProps) => JSX.Element;
}>;

const EVENT_TEMPLATE_LIST: Record<string, TemplateImportFn> = {
  TVCEvent: () => import('@event-mobile-front/templates/Events/TVCEvent'),
  // 다른 이벤트들...
};
const fallbackTemplate: TemplateImportFn = () => import('@event-mobile-front/templates/Fallback');

export default function EventViewClient({ eventId }: EventViewClientProps) {
  const queryKey = queryKeys.event.detail(eventId);
  const { data } = useQuery({
    queryKey,
    queryFn: () => getEventDetailPage(eventId),
  });

  if (!data) return <div>이벤트 없어유~</div>;
  const EventTemplate = dynamic(EVENT_TEMPLATE_LIST[data.eventTitle] || fallbackTemplate, {
    ssr: false,
    loading: () => <div>템플릿 로딩 중...</div>,
  });

  return (
    <EventTemplate data={data} />
  );
}
