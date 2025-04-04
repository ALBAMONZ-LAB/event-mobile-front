import { PageJsonContentsItem } from '@event-mobile-front/types';
import { IoMdArrowBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

export interface HeaderProps {
  contents: Partial<PageJsonContentsItem>;
}

export const Header = ({ contents }: HeaderProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '53px',
        justifyContent: 'space-between',
      }}
    >
      <IoMdArrowBack size={24} style={{ marginLeft: 20, marginRight: 15, flexShrink: 0 }} />
      <div style={{ width: '100%' }}>
        <h3
          style={{
            ...contents.style,
            wordBreak: 'keep-all',
            margin: 0,
          }}
        >
          {contents.text}
        </h3>
      </div>
      <RxHamburgerMenu
        size={24}
        style={{ marginRight: 20, marginLeft: 15, flexShrink: 0 }}
        onClick={() => alert('hamburger clicked')}
      />
    </div>
  );
};
