import { PageJsonContentsItem } from '@event-mobile-front/types'

export interface FloatingButtonProps {
  contents: PageJsonContentsItem;
  sectionStyle?: React.CSSProperties;
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
