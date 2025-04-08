'use client';

import { EventDetailContent, EventDetailContentProps } from '@event-mobile-front/templates';

interface TvcEventTemplateProps extends EventDetailContentProps {
  onClick?: () => void;
}

export default function TvcEventTemplate({ data }: TvcEventTemplateProps) {
  const handleSubmit = () => {
    alert('버트트트트튼');
  };

  const buttonActions = {
    0: handleSubmit,
    3: () => {
      alert('플로팅버튼');
    },
  };
  return <EventDetailContent data={data} buttonActions={buttonActions}/>;
}
