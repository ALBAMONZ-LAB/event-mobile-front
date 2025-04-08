import { StyleConfig } from '@event-mobile-front/types';

interface FloatingButtonContent {
  text: string;
  style?: StyleConfig;
}

export interface FloatingButtonProps {
  contents: FloatingButtonContent;
  onClick?: () => void;
}

export const FloatingButton = ({ contents, onClick }: FloatingButtonProps) => {
  return (
    <button style={contents.style} onClick={onClick}>
      {contents.text}
    </button>
  );
};
