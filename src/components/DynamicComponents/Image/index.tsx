import { StyleConfig } from '@event-mobile-front/types';

interface ImageContent {
  src: string;
  style?: StyleConfig;
}

export interface ImageProps {
  contents: ImageContent;
}

export const Image = ({ contents }: ImageProps) => {
  return <>{contents.src && <img src={contents.src} alt="example" style={{ ...contents.style }} />}</>;
};
