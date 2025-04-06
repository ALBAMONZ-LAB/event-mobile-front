import { StyleConfig } from '@event-mobile-front/types';

interface ButtonContent {
  text: string;
  style?: StyleConfig;
}

export interface ButtonProps {
  contents: ButtonContent;
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
