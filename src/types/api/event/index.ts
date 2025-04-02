import { PageJson } from '@event-mobile-front/types/event';

export interface EventDetailResponse {
  id: number;
  eventTitle: string;
  pageJson: PageJson;
  createdAt: string;
}