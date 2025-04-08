import {
  Button,
  ButtonProps,
  Carousel,
  CarouselProps,
  CustomizedComponent,
  FloatingButton,
  FloatingButtonProps,
  Footer,
  FooterProps,
  Header,
  HeaderProps,
  Image,
  ImageProps,
} from '@event-mobile-front/components';
import { ComponentType } from 'react';
import { EventDetailResponse, StyleConfig } from '@event-mobile-front/types';

type ButtonActionType = Record<number, () => void>;
export interface EventDetailContentProps {
  data: EventDetailResponse;
  buttonActions?: ButtonActionType;
}

export function EventDetailContent({ data, buttonActions }: EventDetailContentProps) {
  const { body, footer } = data.pageJson;

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
              <RenderComponent {...(item as ComponentData)} buttonActions={buttonActions} />
            </section>
          ))
        ) : (
          <p>Empty body...</p>
        )}
      </div>
      {footer && <Footer contents={footer.contents} />}
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

const CLICKABLE_KEYS = ['button', 'floatingButton'];

const RenderComponent = ({ ...props }: ComponentData & { buttonActions?: ButtonActionType }) => {
  if (!props.sectionType) return null;
  const { orderNo, sectionType, ...rest } = props;

  const Component = MAPPED_COMPONENTS[props.sectionType] as ComponentType<any>;
  if (!Component) return null;

  const isClickable = (sectionType: keyof ComponentPropsMap) => {
    return CLICKABLE_KEYS.includes(sectionType);
  };

  const handleOnClickAsProps = (sectionType: keyof ComponentPropsMap) => {
    let injectedProps = rest;
    if (isClickable(sectionType) && orderNo) {
      const onClick = props.buttonActions?.[orderNo];
      injectedProps = { ...rest, onClick };
    }
    return injectedProps;
  };

  const injectedProps = handleOnClickAsProps(sectionType);

  return <Component {...injectedProps} />;
};
