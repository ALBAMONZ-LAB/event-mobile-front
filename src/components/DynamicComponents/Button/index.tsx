import { PageJsonContentsItem } from'@event-mobile-front/types'

export interface ButtonProps {
  contents: PageJsonContentsItem;
}

export const Button = ({ contents }: ButtonProps) => {
  return (
    <button
      style={contents.style}
      onClick={() => {
        alert(`"${contents.text}" 버튼 클릭`);
      }}
    >
      {contents.text}
    </button>
  );
};
