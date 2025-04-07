'use client';

import { useEffect } from 'react';
import { authCheck } from '@event-mobile-front/api/account/account.api';

export default function LoginCheckClient() {
  useEffect(() => {
    // 알바몬 dev bff 로그인 테스트
    (async ()=> {
      try {
        const data = await authCheck();
        console.log(data);
      } catch (error) {
        console.error('Error during auth check:', error);
      }
    })()
  }, []);
  return <div>로그인체크테스트</div>;
}
