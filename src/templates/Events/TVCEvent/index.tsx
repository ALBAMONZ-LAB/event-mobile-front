import { EventDetailContent, EventDetailContentProps } from '@event-mobile-front/templates';

interface TvcEventTemplateProps extends EventDetailContentProps{
  onClick?: () => void;
}

export default function TvcEventTemplate({ data }: TvcEventTemplateProps) {
  return <EventDetailContent data={data}/>;
}
