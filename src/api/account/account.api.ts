import { axiosGeneralBff } from '@event-mobile-front/api/axiosInstance';

export async function authCheck() {
  const data  = await axiosGeneralBff.get<any>('/member/check/auth');
  return data;
}
