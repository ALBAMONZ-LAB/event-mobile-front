import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventDetailResponse, EventListResponse } from '@event-mobile-front/types';
import { getEventDetailPage, getEventListPage } from '@event-mobile-front/api/event/event.api';
import { queryKeys } from '@event-mobile-front/queryKey';

export const useGetEventPage = (eventId: number, options = {}): UseQueryResult<EventDetailResponse, AxiosError> => {
  return useQuery({
    queryKey: queryKeys.event.detail(eventId),
    queryFn: () => getEventDetailPage(eventId),
    ...options,
  });
};

export const useGetEventListPage = (options = {}): UseQueryResult<EventListResponse[], AxiosError> => {
  return useQuery({ queryKey: queryKeys.event.all, queryFn: () => getEventListPage(), ...options });
};
