import { CSSProperties } from "react";

export interface ImageProps {
  contents: {
    src: string;
    style?: CSSProperties & {
      imageWidth?: string | number;
    };
  };
  sectionStyle?: CSSProperties;
}

export const Image = ({ contents }: ImageProps) => {
  return (
    <>
      {contents.src && <img src={contents.src} alt="example" style={{ width: contents.style?.width || '100%' }} />}
    </>
  );
};
