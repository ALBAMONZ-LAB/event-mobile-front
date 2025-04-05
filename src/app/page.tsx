import { Header, EventListClient } from '@event-mobile-front/components';
import { getEventListPage } from '@event-mobile-front/api';
import { queryKeys } from '@event-mobile-front/queryKey';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.event.all,
    queryFn: getEventListPage,
  });

  return (
    <div>
      <Header title={'이벤트 목록'} />
      <main>
        <EventListClient />
      </main>
      {/* <footer>푸터</footer> */}
    </div>
  );
}
