import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventDetailResponse } from '@event-mobile-front/types';
import { getEventDetailPage } from '@event-mobile-front/api/event/event.api';

export const useGetEventPage = (eventId: number, options = {}): UseQueryResult<EventDetailResponse, any> => {
  return useQuery({ queryKey: ['event', eventId], queryFn: () => getEventDetailPage(eventId), ...options });
};

