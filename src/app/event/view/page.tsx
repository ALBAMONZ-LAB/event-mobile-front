import EventDetailClient from './client';

export default async function EventViewPage() {
  return <EventDetailClient />;
}

// prefetchQuery 를 server component에서 안하고 client component에서한 이유 물어보기!
// import { getEventDetailPage } from '@event-mobile-front/api';
// import { Header } from '@event-mobile-front/components';
// import { EventDetailResponse } from '@event-mobile-front/types';
// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import { notFound } from 'next/navigation';
// import { Suspense } from 'react';

// export default async function EventViewPage() {
//   const queryClient = new QueryClient();
//   const queryKey = ['event', 1];

//   await queryClient.prefetchQuery({
//     queryKey: ['event', 1],
//     queryFn: () => getEventDetailPage(1),
//   });

//   const eventData = queryClient.getQueryData<EventDetailResponse>(queryKey);
//   if (!eventData) {
//     notFound(); // 404
//   }
//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <>
//       <Header title={eventData.pageJson.header} />
//       <HydrationBoundary state={dehydratedState}>
//         <Suspense fallback={<div>Loading...</div>}>
//           <div>로딩완료</div>
//         </Suspense>
//       </HydrationBoundary>
//     </>
//   );
// }
