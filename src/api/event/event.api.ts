import { axiosInstance } from '@event-mobile-front/api/axiosInstance';
import { EventDetailResponse, EventListResponse } from '@event-mobile-front/types';

export const getEventDetailPage = async (eventId: number): Promise<EventDetailResponse> => {
  const { data } = await axiosInstance.get(`/event-pages/${eventId}`);
  return data;
};

/** 전체 데이터 가져오는 api라서 나중에 커지면 페이지네이션으로 교체 필요 */
export const getEventListPage = async (): Promise<EventListResponse[]> => {
  const { data } = await axiosInstance.get(`/event-pages/all`);
  return data;
};
