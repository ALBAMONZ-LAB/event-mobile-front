'use client';

import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';


export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  type?: 'default' | 'transparent' | 'fixed';
}

const cx = classNames.bind(styles);
const rootClassName = 'header';

export function Header({ title = '', showBackButton = false, type = 'default' }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={cx(rootClassName)}>
      {!showBackButton && <button onClick={() => {
        router.back();
      }}>←</button>}
      <h1 className={cx(`${rootClassName}__title`)}>{title}</h1>
    </header>
  );
}

export default Header;