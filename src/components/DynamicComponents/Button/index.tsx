import { StyleConfig } from '@event-mobile-front/types';

interface ButtonContent {
  text: string;
  style?: StyleConfig;
}

export interface ButtonProps {
  contents: ButtonContent;
  onClick?: () => void;
}

export const Button = ({ contents, onClick }: ButtonProps) => {
  return (
    <button style={contents.style} onClick={onClick}>
      {contents.text}
    </button>
  );
};
