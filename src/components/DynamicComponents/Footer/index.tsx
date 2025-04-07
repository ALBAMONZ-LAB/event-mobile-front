import { StyleConfig } from '@event-mobile-front/types';

interface FooterContent {
  src?: string;
  style?: StyleConfig;
}

export interface FooterProps {
  contents: FooterContent;
}

export const Footer = ({ contents }: FooterProps) => {
  return <footer style={contents.style}>{contents.src}</footer>;
};
