import {
  Button, ButtonProps,
  Carousel, CarouselProps,
  CustomizedComponent,
  FloatingButton, FloatingButtonProps,
  Footer, FooterProps,
  Header, HeaderProps,
  Image, ImageProps,
} from '@event-mobile-front/components';
import { ComponentType } from 'react';
import { EventDetailResponse, StyleConfig } from '@event-mobile-front/types';

interface EventDetailContentProps {
  data: EventDetailResponse;
}

export function EventDetailContent({ data }: EventDetailContentProps) {

  const {body, footer } = data.pageJson;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //background: eventBackground,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {Array.isArray(body) && body.length > 0 ? (
          body.map((item, index) => (
            <section
              key={`${item.sectionType}_${index}`}
              style={{
                ...item.sectionStyle,
                ...(item.sectionType === 'floatingButton' && { position: 'fixed', width: '360px' }),
              }}
            >
              <RenderComponent {...(item as ComponentData)} />
            </section>
          ))
        ) : (
          <p>Empty body...</p>
        )}
      </div>
      {footer && <Footer contents={ footer.contents } />}
    </div>
  );
}

const MAPPED_COMPONENTS: {
  [K in keyof ComponentPropsMap]: ComponentType<ComponentPropsMap[K]>;
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
  custom: object;
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

  const Component = MAPPED_COMPONENTS[props.sectionType] as ComponentType<any>;
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
