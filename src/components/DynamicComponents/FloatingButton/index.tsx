import { StyleConfig } from '@event-mobile-front/types';

interface FloatingButtonContent {
  text: string;
  style?: StyleConfig;
}

export interface FloatingButtonProps {
  contents: FloatingButtonContent;
}

export const FloatingButton = ({ contents }: FloatingButtonProps) => {
  return (
    <button
      style={contents.style}
      onClick={() => {
        alert(`"${contents.text}" 플로팅 버튼 클릭`);
      }}
    >
      {contents.text}
    </button>
  );
};
