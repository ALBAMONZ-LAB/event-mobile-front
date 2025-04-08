'use client';

import { EventDetailContent, EventDetailContentProps } from '@event-mobile-front/templates';

interface TvcEventTemplateProps extends EventDetailContentProps {
  onClick?: () => void;
}

// TODO it should be refactored...
const useTvcEventButtonActions = () => {
  const handleSubmit = () => alert('button event from template');
  const handleFloating = () => alert('floating button event from template');

  return {
    1: handleSubmit,
    3: handleFloating,
  };
};

export default function TvcEventTemplate({ data }: TvcEventTemplateProps) {
  const buttonActions = useTvcEventButtonActions();

  return <EventDetailContent data={data} buttonActions={buttonActions} />;
}
