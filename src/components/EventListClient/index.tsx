'use client';

import Link from 'next/link';
import { useGetEventListPage } from '@event-mobile-front/api';

export default function EventListClient() {
  const { data, isLoading, error } = useGetEventListPage();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <main>
      {data?.map(event => (
        <div key={event.id}>
          <Link href={`/event/view?eventId=${event.id}`}>
            <h2>{event.eventTitle}</h2>
          </Link>
        </div>
      ))}
    </main>
  );
}
