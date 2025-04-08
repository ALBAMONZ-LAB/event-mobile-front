import { EventDetailResponse } from '@event-mobile-front/types';

interface EventDetailTemplateProps {
  data: EventDetailResponse;
}

export default function FallbackTemplate({ data }: EventDetailTemplateProps) {
  return <div>지원하지 않는 이벤트입니다. ({data.eventTitle})</div>;
}

