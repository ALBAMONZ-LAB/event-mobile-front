'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { getEventDetailPage } from '@event-mobile-front/api';
import { queryKeys } from '@event-mobile-front/queryKey';
import { useQuery } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import {
  Header,
  Button,
  Carousel,
  FloatingButton,
  Footer,
  CustomizedComponent,
  Image,
  HeaderProps,
  ButtonProps,
  CarouselProps,
  FloatingButtonProps,
  FooterProps,
  ImageProps,
} from '@event-mobile-front/components';
import { StyleConfig } from '@event-mobile-front/types';

export default function EventViewClient() {
  const searchParams = useSearchParams();
  const eventId = Number(searchParams.get('eventId'));

  const [queryClient] = useState(() => new QueryClient());

  if (Number.isNaN(eventId)) return <div>잘못된 접근입니다</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <PrefetchAndRender eventId={eventId} />
    </QueryClientProvider>
  );
}

function PrefetchAndRender({ eventId }: { eventId: number }) {
  const [ready, setReady] = useState(false);
  const [dehydratedState, setDehydratedState] = useState<DehydratedState | null>(null);
  const queryClient = new QueryClient();

  useEffect(() => {
    queryClient
      .prefetchQuery({
        queryKey: queryKeys.event.detail(eventId),
        queryFn: () => getEventDetailPage(eventId),
      })
      .then(() => {
        const state = dehydrate(queryClient);
        setDehydratedState(state);
        setReady(true);
      });
  }, [eventId]);

  if (!ready) return <div>Hydrating...</div>;

  return (
    <HydrationBoundary state={dehydratedState}>
      <EventDetailContent eventId={eventId} />
    </HydrationBoundary>
  );
}

function EventDetailContent({ eventId }: { eventId: number }) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.event.detail(eventId),
    queryFn: () => getEventDetailPage(eventId),
  });

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>Empty here...</div>;

  const { header, body, footer } = data.pageJson;

  return (
    <>
      <Header title={header} />
      <div>
        {Array.isArray(body) && body.length > 0 ? (
          body.map((item, index) => (
            <section
              key={`${item.sectionType}_${index}`}
              style={{
                ...item.sectionStyle,
                ...(item.sectionType === 'floatingButton' && { position: 'absolute', width: '360px' }),
              }}
            >
              <RenderComponent {...(item as ComponentData)} />
            </section>
          ))
        ) : (
          <p>Empty body...</p>
        )}
      </div>
      {/* {footer && <RenderComponent sectionType={'footer'} {{ ...footer.contents }} />} */}
    </>
  );
}

const MAPPED_COMPONENTS: {
  [K in keyof ComponentPropsMap]: React.ComponentType<ComponentPropsMap[K]>;
} = {
  header: Header,
  image: Image,
  button: Button,
  carousel: Carousel,
  floatingButton: FloatingButton,
  footer: Footer,
  custom: CustomizedComponent,
};

interface ComponentPropsMap {
  header: HeaderProps;
  image: ImageProps;
  button: ButtonProps;
  carousel: CarouselProps;
  floatingButton: FloatingButtonProps;
  footer: FooterProps;
  custom: {};
}

type ComponentDataMap = {
  [K in keyof ComponentPropsMap]: {
    sectionType: K;
    orderNo?: number;
    sectionStyle?: StyleConfig;
    children?: ComponentData[];
  } & ComponentPropsMap[K];
};

type ComponentData = ComponentDataMap[keyof ComponentDataMap];

const RenderComponent = ({ ...props }: ComponentData) => {
  if (!props.sectionType) return null;

  const Component = MAPPED_COMPONENTS[props.sectionType] as React.ComponentType<any>;
  if (!Component) return null;

  return (
    <Component {...props}>
      {/* {'children' in props &&
        props.children?.map((child, i) => (
          <span key={`${child.sectionType}_${i}`}>
            <RenderComponent {...child} />
          </span>
        ))} */}
    </Component>
  );
};
