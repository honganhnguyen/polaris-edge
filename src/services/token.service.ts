import Cookies from 'js-cookie';
import moment from 'moment';

export const setToken = (accessToken: string) => {
  Cookies.set('polarisAccessToken', accessToken);
  Cookies.set('polarisLoginDate', moment().format('YYYY-MM-DD HH:mm:ss'));
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get('polarisAccessToken');
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('polarisRefreshToken');
};

export const removeToken = () => {
  Cookies.remove('polarisAccessToken');
  Cookies.remove('polarisLoginDate');
};
