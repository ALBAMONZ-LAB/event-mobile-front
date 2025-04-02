import { axiosInstance } from '@event-mobile-front/api/axiosInstance';
import { EventDetailResponse } from '@event-mobile-front/types';


export const getEventDetailPage = async (eventId: number): Promise<EventDetailResponse> => {
  const { data } = await axiosInstance.get(`/event-pages/${eventId}`);
  return data;
};
